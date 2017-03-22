import React, { PropTypes } from 'react';
import { Map, TileLayer } from 'react-leaflet';
// new
// import LayersNavigationContainer from './containers/LayersNavigationContainer';
// import LayerInformationContainer from './containers/LayerInformationContainer';
import LocationTypeContainer from './containers/LocationTypeContainer';
// import LayersTabsContainer from './containers/LayersTabsContainer';
// import HistogramContainer from './containers/HistogramContainer';
// import LayerTopContainer from './containers/LayerTopContainer';
// import SearchContainer from './containers/SearchContainer';
import MapContainer from './containers/MapContainer';

export default class Exploracion extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
  }

  render() {
    console.info('rendering all');
    return (
      <div id="exploracion__module">
        <div className="sidebar">
          <LocationTypeContainer/>
        </div>
        <div className="map">
          <MapContainer/>
        </div>
      </div>
    );
  }
}
