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
    const { width, height } = this.props;
    json('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/LatinAmericaMercator.json', (err, data) => {
      this.setState({ 
        data,
        projection: geoMercator().fitSize([width, height], merge(data, data.objects.LatinAmerica.geometries))
      });
    });
  }

  handleCountryClick(feature) {
    const { projection } = this.state;
    const { width, height } = this.props;
    const path = geoPath().projection(projection);
    let x, y, k, selected;
    const selectedFeature = feature.properties.POP_CNTRY === this.state.selected;
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
  }

  render() {
    if(this.state.data.length === 0) {
      return null;
    }
    const { data, x, y, k, projection } = this.state;
    const { width, height } = this.props;
    const path = geoPath().projection(projection);
    const countries = feature(data, data.objects.LatinAmerica).features;
    const countriesPaths = countries.map((feature, index) => {
      const selectedFeature = feature.properties.POP_CNTRY === this.state.selected;
      const emptyFeature = (feature.properties.POP_CNTRY % 2) === 0;
      return <Country 
        key={index}
        className="country"
        selectedClass="country--selected"
        emptyClass="country--empty"
        d={path(feature)}
        selected={selectedFeature}
        empty={emptyFeature}
      />;
    });
    const transform = point => {
      return [
        point[0] * data.transform.scale[0] + data.transform.translate[0],
        point[1] * data.transform.scale[1] + data.transform.translate[1]
      ];
    };

    const projections = geoMercator();
    console.log(data);
    const meshCircles = data.arcs.map((d, index) => {
      console.log(projection(d[0]));
      return <circle
        r="2.5"
        cx={projections(d)[0]}
        cy={projections(d)[1]}
      />;
    });
    const boundaries = mesh(data, data.objects.LatinAmerica, (a, b) => a !== b);
    const boundariesPath = path(boundaries);
    return (
      <svg id="zoomable__svg" width={width} height={height}>
        <rect className="overlay" width={width} height={height}/>
        <g id="zoomable"
          transform={`translate(${0},${0})scale(${k})translate(-${x},-${y})`}>
          <g className="countries">
            {countriesPaths}
          </g>
          <g className="circles">
            {meshCircles}
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
