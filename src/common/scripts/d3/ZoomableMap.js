import React from 'react';
import { geoMercator, geoAlbersUsa, geoPath } from 'd3-geo';
import { zoom as zoomBehaviour } from 'd3-zoom';
import { select } from 'd3-selection';
import { json } from 'd3-request';
import { mesh, merge } from 'topojson';

class ZoomableMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const g = select('#zoomable');
    json('https://s3-us-west-2.amazonaws.com/sedesol-ui-assets/out.json', (err, data) => {
      this.setState({ data });
    });
  }

  render() {
    if(this.state.data.length === 0) {
      return null;
    }

    const width = 960,
      height = 960,
      scale0 = (width - 1) / 2 / Math.PI;
    // const projection = geoMercator();
    const projection = geoAlbersUsa();
    const zoom = zoomBehaviour()
      .scaleExtent([scale0, 8 * scale0])
      .on("zoom", zoomed);
    const path = geoPath()
      .projection(projection);

    function zoomed() {
      projection
        .translate(zoom.translate())
        .scale(zoom.scale());
      select("#zoomable__svg").selectAll("path")
        .attr("d", path);
    }

    const data = this.state.data;
    const meshData = mesh(data, data.objects.out, function(a, b) { return a !== b; });
    const mergeData = merge(data, data.objects.out.geometries);
    const meshPath = path(meshData);
    const mergePath = path(mergeData);

    return (
      <svg id="zoomable__svg" width="400" height="400">
        <g id="zoomable">
          <g>
            <path/>
            <path className="land" d={mergePath}/>
            <path className="boundary" d={meshPath}/>
          </g>
          <rect className="overlay" width="400" height="400"/>
        </g>
      </svg>
    );
  }
}
export default ZoomableMap;
