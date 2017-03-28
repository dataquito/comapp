import React, { PropTypes } from 'react';
import qs from 'qs';
import { Map, TileLayer } from 'react-leaflet';
// new
import LayersNavigationContainer from './containers/LayersNavigationContainer';
// import LayerInformationContainer from './containers/LayerInformationContainer';
import LocationTypeContainer from './containers/LocationTypeContainer';
// import HistogramContainer from './containers/HistogramContainer';
// import LayerTopContainer from './containers/LayerTopContainer';
import SearchContainer from './containers/SearchContainer';
import MapContainer from './containers/MapContainer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

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
        <div className="sidebar">
          <SearchContainer/>
          <LocationTypeContainer/>
          <LayersNavigationContainer/>
        </div>
        <div className="map">
          <MapContainer/>
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
