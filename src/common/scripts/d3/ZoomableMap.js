import React from 'react';
import { geoMercator, geoAlbersUsa, geoPath } from 'd3-geo';
import { zoom as zoomBehaviour } from 'd3-zoom';
import { select } from 'd3-selection';
import { json } from 'd3-request';
import { mesh, merge, feature } from 'topojson';
import SizingHOC from '../hocs/SizingHOC';
import { findDOMNode } from 'react-dom';

import Country from './Country';

@SizingHOC
class ZoomableMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      x: 0,
      y: 0,
      k: 1,
      selected: null
    };
  }

  componentDidMount() {
    const g = select('#zoomable');
    json('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/LatinAmericaMercator.json', (err, data) => {
      this.setState({ data });
    });
  }

  handleCountryClick() {

  }

  render() {
    if(this.state.data.length === 0) {
      return null;
    }
    const { data, x, y, k } = this.state;
    const { width, height } = this.props;
    const projection = geoMercator()
      .fitSize([width, height], merge(data, data.objects.LatinAmerica.geometries));
    const path = geoPath()
      .projection(projection);
    const countries = feature(data, data.objects.LatinAmerica).features;
    const countriesPaths = countries.map((feature, index) => {
      const selectedFeature = feature.properties.POP_CNTRY === this.state.selected;
      const click = () => {
        let x, y, k, selected;
        if(selectedFeature) {
          x = width / 2;
          y = height / 2;
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
      }; 
      return <Country key={index} className="land" d={path(feature)} onClick={click} selected={selectedFeature}/>
    });
    const boundaries = mesh(data, data.objects.LatinAmerica, function(a, b) { return a !== b; });
    const boundariesPath = path(boundaries);
    return (
      <svg id="zoomable__svg" width={width} height={height}>
        <rect className="overlay" width={width} height={height}/>
        <g id="zoomable"
          transform={`translate(${width/2},${height/2})scale(${k})translate(-${x},-${y})`}>
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
