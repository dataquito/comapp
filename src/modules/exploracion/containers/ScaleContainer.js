import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import Scale from 'common-scripts/charts/Scale';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from 'common-redux/actions/exploracionActions';

class ScaleContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const layer = nextProps.selectedLayer !== this.props.selectedLayer;
  //   return layer;
  // }

  render() {
    // console.info('rendering Scale');
    const props = this.props;
    return (
      <Scale layerVector={props.layerVector} colors={props.colors}/>
    );
  }
}

ScaleContainer.propTypes = {
};

ScaleContainer.defaultProps = {
  colors: ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529']
};

const mapStateToProps = (state, ownProps) => {
  const { layerId } = ownProps.location.query;
  const { layerVector } = state.exploracion;
  return { layerVector, selectedLayer: layerId };
};


export default withRouter(connect(mapStateToProps)(ScaleContainer));
