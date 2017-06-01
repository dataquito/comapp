import React from 'react';
import { geoMercator, geoAlbersUsa, geoPath } from 'd3-geo';
import { zoom as zoomBehaviour } from 'd3-zoom';
import { select } from 'd3-selection';
import { json } from 'd3-request';
import { mesh, merge, feature } from 'topojson';
import SizingHOC from '../hocs/SizingHOC';
import { findDOMNode } from 'react-dom';

import Country from './Country';

// @SizingHOC
class ZoomableMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleCountryClick = this.handleCountryClick.bind(this);
    this.state = {
      data: [],
      x: 0,
      y: 0,
      k: 1,
      selected: null,
      projection: null
    };
  }

  componentDidMount() {
    const g = select('#zoomable');
    json('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/LatinAmericaMercator.json', (err, data) => {
      this.setState({ 
        data,
        projection: geoMercator().fitSize([400, 400], merge(data, data.objects.LatinAmerica.geometries))
      });
    });
  }

  handleCountryClick(feature) {
    const { projection } = this.state;
    const path = geoPath().projection(projection);
    let x, y, k, selected;
    const selectedFeature = feature.properties.POP_CNTRY === this.state.selected;
    if(selectedFeature) {
      x = 400 / 2;
      y = 400 / 2;
      k = 1;
      selected = null;
    } else {
      const centroid = path.centroid(feature);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      selected = feature.properties.POP_CNTRY;
    }
    this.setState({ x, y, k, selected });
  }

  render() {
    if(this.state.data.length === 0) {
      return null;
    }
    const { data, x, y, k, projection } = this.state;
    const path = geoPath().projection(projection);
    const countries = feature(data, data.objects.LatinAmerica).features;
    const countriesPaths = countries.map((feature, index) => {
      const selectedFeature = feature.properties.POP_CNTRY === this.state.selected;
      const onClick = () => { this.handleCountryClick(feature) };
      return <Country key={index} className="land" d={path(feature)} onClick={onClick} selected={selectedFeature}/>;
    });
    const boundaries = mesh(data, data.objects.LatinAmerica, function(a, b) { return a !== b; });
    const boundariesPath = path(boundaries);
    return (
      <svg id="zoomable__svg" width="400" height="400">
        <rect className="overlay" width="400" height="400"/>
        <g id="zoomable"
          transform={`translate(${400/2},${400/2})scale(${k})translate(-${x},-${y})`}>
          <g className="countries">
            {countriesPaths}
          </g>
          <g className="mesh">
            <path className="boundary" d={boundariesPath}/>
          </g>
        </g>
      </svg>
    );
  }
}
export default ZoomableMap;
