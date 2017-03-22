import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { scaleQuantile } from 'd3-scale';
import { geoJSON } from 'leaflet';
import leafletPip from 'leaflet-pip';
import fromPairs from 'lodash.frompairs';
import axios from 'axios';
import { feature as tfeature } from 'topojson-client';
import geojsonvt from 'geojson-vt';
import CanvasLayer from 'common-scripts/leaflet/gvt';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from 'common-redux/actions/exploracionActions';

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
    // this.memoizeTileIndex(this.props.locationType)
    //   .then(addLayer)
    //   .catch(err => {
    //     console.error('Error loading tiles', err);
    //   });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.layerVectorRequest) return false;
    const layer = nextProps.selectedLayer !== this.props.selectedLayer;
    const locationType = nextProps.locationType !== this.props.locationType;
    const requesting = nextProps.layerVectorRequest !== this.props.layerVectorRequest;
    // console.log('layer should update?');
    // console.log('next', 'current');
    // console.log(nextProps.selectedLayer, this.props.selectedLayer);
    // console.log(nextProps.locationType, this.props.locationType);
    // console.log(nextProps.layerVectorRequest, this.props.layerVectorRequest);
    // console.log(nextProps.layerVector.length, this.props.layerVector.length);
    // console.log(layer || locationType || requesting);
    return (layer || locationType || requesting);
    // return (layer || locationType);
  }

  componentDidUpdate() {
    // console.log('layer didupdate');
    if(this.props.layerVector.length === 0) return;
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
    // console.info('adding layer');
    const { colors, layerVector, map, locationType } = this.props;
    const dict = fromPairs(layerVector);
    const colorScale = scaleQuantile().domain(layerVector.map(v => v[1])).range(colors);
    const tag = locationType === 1 ? 'CVE_ENT' : 'MID';
    const layer = new CanvasLayer({ tileIndex, colorScale, dict, tag });
    this.__interaction = geoJSON(geojson);
    this.__layer = layer;
    map.addLayer(layer);
    // map.addLayer(this.__interaction);
  }

  render() {
    // console.info('rendering Layer');
    // console.info('rendering Layer', this.props);
    return null;
  }

}

LayerContainer.defaultProps = {
  colors: ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529']
};

const mapStateToProps = (state, ownProps) => {
  const { locationType, layerId } = ownProps.location.query;
  const { layerVector, layerVectorRequest, layerVectorFailure } = state.exploracion;
  return { selectedLayer: layerId, locationType: +locationType, layerVector, layerVectorRequest, layerVectorFailure };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(exploracionActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayerContainer));
