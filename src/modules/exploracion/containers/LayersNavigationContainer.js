import React, { PropTypes } from 'react';
import { nest } from 'd3-collection';
import { ascending } from 'd3-array';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from '../actions';

class LayersNavigationContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const loca
  // }

  onClick(e) {
    const tab = +e.currentTarget.dataset.tab;
    const realTab = tab === this.props.activeTab ? -1 : tab;
    this.props.actions.setActiveTab(realTab);
  }

  render() {
    // console.log('rendering LayersNavigationContainer');
    const layers = this.props.layers;
    const nested = nest()
      .key(d => d.fuente)
      .sortKeys(ascending)
      .key(d => d.nombre)
      .sortKeys(ascending)
      .entries(layers);
    const onClick = this.onClick;
    const activeTab = this.props.activeTab;
    const navigation = nested.map((v, i) => {
      const activeClass = activeTab === i ? 'layer__tab--active' : '';
      return (
        <div className={`layer__tab ${activeClass}`} key={i} data-tab={i} onClick={onClick}>
          <span>{v.key}</span>
        </div>
      );
    });
    return (
      <div className="layers-navigation__container">
        <span className="layers-navigation__title">Layers</span>
        <div className="layers-navigation__options">
          {navigation}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { layers, activeTab } = state.exploracion;
  return { layers, activeTab };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(exploracionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayersNavigationContainer);
