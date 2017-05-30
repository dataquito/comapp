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
      data: [],
      x: null,
      y: null,
      k: null
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
    const projection = geoMercator()
      .fitSize([400, 400], merge(data, data.objects.LatinAmerica.geometries));
    const path = geoPath()
      .projection(projection);
    const countries = feature(data, data.objects.LatinAmerica).features;
    const countriesPaths = countries.map((feature, index) => {

      const click = clicked.bind(feature); 
      return <path className="land" key={index} d={path(feature)} onClick={clicked}/>;
    });
    const boundaries = mesh(data, data.objects.LatinAmerica, function(a, b) { return a !== b; });
    const boundariesPath = path(boundaries);
    function clicked() {
      console.log(this);
      const centroid = path.centroid(this);
      let x = centroid[0];
      let y = centroid[1];
      let k = 4;
      console.log(x,y,k);
    }
    // function change(x,y,k) {
    //   this.setState({
    //     x, y, k
    //   });
    // }
    return (
      <svg id="zoomable__svg" width="400" height="400">
        <rect className="overlay" width="400" height="400"/>
        <g id="zoomable">
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
