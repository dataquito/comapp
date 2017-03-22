import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import Spinner from 'app-scripts/core/Spinner';
import Histogram from 'app-scripts/charts/Histogram';
import ErrorBlock from 'app-scripts/core/ErrorBlock';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class HistogramContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const layer = nextProps.selectedLayer !== this.props.selectedLayer;
    const requesting = nextProps.layerVectorRequest !== this.props.layerVectorRequest;
    return (layer || requesting);
    // const dataRequest = nextProps.layerVectorRequest !== thi
    // if(layer) {
    //   return true;
    // }
  }

  render() {
    // console.info('rendering HistogramContainer');
    const { layerVector, layerVectorRequest, layerVectorFailure } = this.props;
    if(layerVectorRequest) {
      return (
        <div className="layer__histogram">
          {/*<Spinner/>*/}
        </div>
      );
    }
    if(layerVectorFailure) {
      return (
        <div className="layer__histogram">
          <ErrorBlock message="Whoops, seems like we are having trouble displaying this information. Please hang tight until we solve this."/>
        </div>
      );
    }
    if(layerVector.length === 0) {
      return (
        <div className="layer__histogram">
          {/*<ErrorBlock message="Whoops, seems like there is no information. Please hang tight until we solve this."/>*/}
        </div>
      );
    }
    const data = layerVector.map(v => v[1]);
    return (
      <div className="layer__histogram">
        <Histogram height="100px" data={data}/>
      </div>
    );
  }
}

HistogramContainer.propTypes = {
  layerVector: PropTypes.array.isRequired,
  layerVectorRequest: PropTypes.bool.isRequired,
  layerVectorFailure: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

HistogramContainer.defaultProps = {
  layerVector: [],
  layerVectorRequest: false,
  layerVectorFailure: false 
};

const mapStateToProps = (state, ownProps) => {
  const { layerId } = ownProps.location.query;
  const { layerVector, layerVectorRequest, layerVectorFailure } = state.exploracion;
  return { selectedLayer: layerId, layerVector, layerVectorRequest, layerVectorFailure };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HistogramContainer));
