import React, { PropTypes } from 'react';
import qs from 'qs';
import { Map, TileLayer } from 'react-leaflet';
// new
import LayersNavigationContainer from './containers/LayersNavigationContainer';
import LayerInformationContainer from './containers/LayerInformationContainer';
import LocationTypeContainer from './containers/LocationTypeContainer';
import LayersTabsContainer from './containers/LayersTabsContainer';
import SearchContainer from './containers/SearchContainer';
import MapContainer from './containers/MapContainer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import comapp_logo from 'app-images/dataquito-logo.png';

import Navigation from 'app-scripts/core/Navigation';

class Exploracion extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const query = qs.parse(this.props.location.search.substr(1));
    const { locationType } = query;
    this.props.actions.fetchLayers(locationType);
    // this.props.actions.fetchLayerVector(selectedLayer, locationType);       
  }

  render() {
    console.info('rendering all');
    return (
      <div id="exploracion__module">
        <Navigation/>
        <div style={{ height: 'calc(100vh - 52px)', display: 'flex' }}>
          <div className="dock">
            <SearchContainer/>
            <LocationTypeContainer/>
            <LayersNavigationContainer/>
            <LayersTabsContainer/>
          </div>
          <div className="map" style={{ width: '100%' }}>
            <MapContainer/>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(Exploracion);
