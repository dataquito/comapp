import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { scaleQuantile } from 'd3-scale';
import { geoJSON } from 'leaflet';
import leafletPip from 'leaflet-pip';
import fromPairs from 'lodash.frompairs';
import axios from 'axios';
import { feature as tfeature } from 'topojson-client';
import geojsonvt from 'geojson-vt';
import qs from 'qs';
import CanvasLayer from 'app-scripts/leaflet/CanvasLayer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const options = {
  maxZoom: 14,  // max zoom to preserve detail on
  tolerance: 3, // simplification tolerance (higher means simpler)
  extent: 4096, // tile extent (both width and height)
  buffer: 64,   // tile buffer on each side
  debug: 0,      // logging level (0 to disable, 1 or 2)
  indexMaxZoom: 4,        // max zoom in the initial tile index
  indexMaxPoints: 100000, // max number of points per tile in the index
  solidChildren: false    // whether to include solid tile children in the index
};

class LayerContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.memoizeTileIndex = this.memoizeTileIndex();
    this.addLayer = this.addLayer.bind(this);
    this.__layer = null;
    this.__interaction = null;
    props.map.on('click', e => {
      if(this.__interaction === null) return;
      const { lat, lng } = e.latlng;
      const layerData = leafletPip.pointInLayer([lng, lat], this.__interaction, true);
      if(!layerData) return;
      const featureProperties = layerData[0].feature.properties;
      const id = this.props.locationType === 1 ? 'CVE_ENT' : 'MID';
      const fields = featureProperties[id];
      this.props.actions.fetchLocation(this.props.locationType, fields, [lng, lat]);
    });
  }

  memoizeTileIndex(l) {
    const memo = {};
    function fetchTopo(l) {
      return new Promise((resolve, reject) => {
        if(l in memo) {
          // console.log('from cache');
          resolve(memo[l]);
        } else {
          if(l === 1) {
            axios.get('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/jsons/Estados.json')
              .then(res => {
                const data = res.data;
                const geo = tfeature(data, data.objects['Estados']);
                memo[l] = {};
                memo[l].tileIndex = geojsonvt(geo, options);
                memo[l].geojson = geo;
                // memo[l] = geojsonvt(geo, options);
                resolve(memo[l]);
              });
          } else if (l === 2) {
            axios.get('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/jsons/municipalities.json')
              .then(res => {
                const data = res.data;
                const geo = tfeature(data, data.objects['municipalities']);
                // memo[l] = geojsonvt(geo, options);
                memo[l] = {};
                memo[l].tileIndex = geojsonvt(geo, options);
                memo[l].geojson = geo;
                resolve(memo[l]);
              });
          }
        }
      });
    }
    return fetchTopo;
  }

  componentDidMount() {
    const addLayer = this.addLayer;
    this.memoizeTileIndex(this.props.locationType)
      .then(addLayer)
      .catch(err => {
        console.error('Error loading tiles', err);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.layerVectorRequest) return false;
    const layer = nextProps.selectedLayer !== this.props.selectedLayer;
    const locationType = nextProps.locationType !== this.props.locationType;
    const requesting = nextProps.layerVectorRequest !== this.props.layerVectorRequest;
    return (layer || locationType || requesting);
  }

  componentDidUpdate() {
    // if(this.props.layerVector.length === 0) return;
    if(this.__layer !== null) {
      const map = this.props.map;
      map.removeLayer(this.__layer);
      map.removeLayer(this.__interaction);
    }
    const addLayer = this.addLayer;
    this.memoizeTileIndex(this.props.locationType)
      .then(addLayer)
      .catch(err => {
        console.error('Error loading tiles', err);
      });
  }

  addLayer({ tileIndex, geojson }) {
    const { colors, layerVector, map, locationType } = this.props;
    const dict = fromPairs(layerVector);
    const colorScale = scaleQuantile().domain(layerVector.map(v => v[1])).range(colors);
    const tag = locationType === 1 ? 'CVE_ENT' : 'MID';
    const layer = new CanvasLayer({ tileIndex, colorScale, dict, tag });
    this.__interaction = geoJSON(geojson);
    this.__layer = layer;
    map.addLayer(layer);
  }

  render() {
    return null;
  }

}

LayerContainer.defaultProps = {
  // colors: ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529']
  // colors: ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177']
  // colors: ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84']
  // colors: ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525']
  // colors: ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026']
  colors: ['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#08589e']
};

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search.substr(1));
  const { layerId, locationType } = query;
  const { layerVector, layerVectorRequest, layerVectorFailure } = state.exploracion;
  return { selectedLayer: layerId, locationType: +locationType, layerVector, layerVectorRequest, layerVectorFailure };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayerContainer));
