import React, { PropTypes } from 'react';
import qs from 'qs';
import { Map, TileLayer } from 'react-leaflet';
// new
import LayersNavigationContainer from './containers/LayersNavigationContainer';
import LayerInformationContainer from './containers/LayerInformationContainer';
import LocationTypeContainer from './containers/LocationTypeContainer';
import LayersTabsContainer from './containers/LayersTabsContainer';
// import HistogramContainer from './containers/HistogramContainer';
// import LayerTopContainer from './containers/LayerTopContainer';
import SearchContainer from './containers/SearchContainer';
import MapContainer from './containers/MapContainer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import comapp_logo from 'app-images/dataquito-logo.png';

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
          <dl className="sidebar__list">
            <dt className="sidebar__item sidebar__search">
              <span>
                <SearchContainer/>
              </span>
            </dt>
            <dt className="sidebar__title"><span>División territorial</span></dt>
            <dt className="sidebar__item sidebar__location">
              <span>
                <LocationTypeContainer/>
              </span>
            </dt>
            <dt className="sidebar__title"><span>Información geográfica</span></dt>
            <dt className="sidebar__item sidebar__location">
              <span>
                <LayersNavigationContainer/>
              </span>
            </dt>
            <dt className="sidebar__title"><span>Capas disponibles</span></dt>
          </dl>
        </div>
        <div className="layers">
          <LayersTabsContainer/>
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
