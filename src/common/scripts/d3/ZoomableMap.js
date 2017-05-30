import React from 'react';
import { geoMercator, geoAlbersUsa, geoPath } from 'd3-geo';
import { zoom as zoomBehaviour } from 'd3-zoom';
import { select } from 'd3-selection';
import { json } from 'd3-request';
import { mesh, merge, feature } from 'topojson';
import SizingHOC from '../hocs/SizingHOC';
import { findDOMNode } from 'react-dom';

// @SizingHOC
class ZoomableMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const g = select('#zoomable');
    console.log(findDOMNode(this));
    json('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/LatinAmericaMercator.json', (err, data) => {
      this.setState({ data });
    });
  }

  render() {
    if(this.state.data.length === 0) {
      return null;
    }


    const data = this.state.data;
    console.log(data);
    const projection = geoMercator()
      .fitSize([400, 400], merge(data, data.objects.LatinAmerica.geometries));
    const path = geoPath()
      .projection(projection);

    const countries = feature(data, data.objects.LatinAmerica).features;
    const countriesPaths = countries.map((feature, index) => {
      return <path className="land" key={index} d={path(feature)}/>;
    });
    const boundaries = mesh(data, data.objects.LatinAmerica, function(a, b) { return a !== b; });
    const boundariesPath = path(boundaries);
    return (
      <svg id="zoomable__svg" width="400" height="400">
        <g id="zoomable">
          <g className="countries">
            {countriesPaths}
          </g>
          <g className="mesh">
            <path className="boundary" d={boundariesPath}/>
          </g>
          <rect className="overlay" width="400" height="400"/>
        </g>
      </svg>
    );
  }
}
export default ZoomableMap;
