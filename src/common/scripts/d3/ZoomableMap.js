import React from 'react';
import { geoMercator, geoAlbersUsa, geoPath } from 'd3-geo';
import { zoom as zoomBehaviour } from 'd3-zoom';
import { select } from 'd3-selection';
import { json } from 'd3-request';
import { mesh, merge, feature } from 'topojson';

class ZoomableMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const g = select('#zoomable');
    json('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/us.json', (err, data) => {
      this.setState({ data });
    });
  }

  render() {
    if(this.state.data.length === 0) {
      return null;
    }

    const projection = geoAlbersUsa()
      .scale(500)
      .translate([400/ 2, 400/ 2]);
    const path = geoPath()
      .projection(projection);

    const data = this.state.data;
    const countries = feature(data, data.objects.states).features;
    const countriesPaths = countries.map((feature, index) => {
      return <path className="land" key={index} d={path(feature)}/>;
    });
    const boundaries = mesh(data, data.objects.states, function(a, b) { return a !== b; });
    const boundariesPath = path(boundaries);
    // const countriesPath = path(countries);

    return (
      <svg id="zoomable__svg" width="400" height="400">
        <g id="zoomable">
          <g>
            {countriesPaths}
            <path className="boundary" d={boundariesPath}/>
          </g>
          <rect className="overlay" width="400" height="400"/>
        </g>
      </svg>
    );
  }
}
export default ZoomableMap;
