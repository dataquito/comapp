import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import ErrorBlock from 'common-scripts/presentation/ErrorBlock';

import { nest } from 'd3-collection';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from 'common-redux/actions/exploracionActions';

class LayerInformationContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    return nextProps.selectedLayer !== this.props.selectedLayer || nextProps.layers.length !== this.props.layers.length;
  }

  render() {
    // console.info('rendering LayerInfo');
    const { layers, selectedLayer } = this.props;
    const layer = layers.find(l => l.id === selectedLayer);
    if(typeof layer === 'undefined') {
      return (
        <div style={{ padding: '15px' }}>
          <div className="layer__information">
            <span className="layer__name">Select layer</span>
          </div>
        </div>
      );
    }
    const { nombre, tipo, metadata } = layer;
    return (
      <div style={{ padding: '15px' }}>
        <div className="layer__information">
          <span className="layer__name">{nombre} <span className="layer__type">{tipo}</span></span>
          <span className="layer__metadata">{metadata}</span>
        </div>
      </div>
    );
  }
}

// LayerInfo.propTypes = {
//   actions: PropTypes.object.isRequired
// };

// LayerInfo.defaultProps = {
// };

const mapStateToProps = (state, ownProps) => {
  const { layerId } = ownProps.location.query;
  const { layers } = state.exploracion;
  return { layers, selectedLayer: layerId };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(exploracionActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayerInformationContainer));
