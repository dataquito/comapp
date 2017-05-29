import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import LayerContainer from './LayerContainer';
import qs from 'qs';
import { Map, TileLayer } from 'react-leaflet';

class MapContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.moveend = this.moveend.bind(this);
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  moveend(map) {
    const history = this.props.history;
    const query = qs.parse(this.props.location.search.substr(1));
    const center = map.target.getCenter();
    const zoom = map.target.getZoom();
    const mergeQuery = { ...query, center: `${center.lat},${center.lng}`, zoom: zoom };
    history.replace({ 
      pathname: '/exploracion', 
      search: `?${qs.stringify(mergeQuery)}`
    });
  }

  render() {
    // console.info('rendering map exploracion');
    const props = this.props;
    const query = qs.parse(this.props.location.search.substr(1));
    const center = query.center.split(',').map(v => +v);
    const zoom = +query.zoom;
    console.log('rendering map');
    return (
        <Map center={center} zoom={zoom} onMoveend={this.moveend} zoomControl={false}>
          <LayerContainer/>
          {/*<ScaleContainer/>
          <PopUp/>*/}
          <TileLayer url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" 
            attribution={`&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors`}/>
        </Map>
    );
  }
}

// MapLanding.propTypes = {
// };

// MapLanding.defaultProps = {
//   // latLng: [19.432904, -99.1568927]
// };

export default withRouter(MapContainer);
