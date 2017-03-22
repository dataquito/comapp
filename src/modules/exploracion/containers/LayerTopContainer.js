import React, { PropTypes } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { formatThousandsNoRounding } from 'helpers/basic';
import states from 'helpers/states';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from 'common-redux/actions/exploracionActions';

class LayerTopContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { layerVector } = this.props;
    const bottom = layerVector.slice(0, 10);
    const top = layerVector.slice(Math.max(layerVector.length - 10, 1)).reverse();
    return (
      <div className="exploracion__ranking">
        <div className="ranking__top">
          <h5>Top 10 Locations</h5>
          <table className="ranking__table">
            <tbody>
              {
                top.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>{states[v[0]]}</td>
                      <td>{formatThousandsNoRounding(v[1])}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div className="ranking__bottom">
          <h5>Bottom 10 Locations</h5>
          <table className="ranking__table">
            <tbody>
              {
                bottom.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>{states[v[0]]}</td>
                      <td>{formatThousandsNoRounding(v[1])}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { layerVector } = state.exploracion;
  return { layerVector };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(exploracionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayerTopContainer);
