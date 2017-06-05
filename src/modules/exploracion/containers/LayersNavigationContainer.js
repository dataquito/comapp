import React, { PropTypes } from 'react';
import qs from 'qs';
import { withRouter, browserHistory } from 'react-router';
import { nest } from 'd3-collection';
import { ascending } from 'd3-array';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from '../actions';

class LayersNavigationContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e) {
    const value = e.target.value;
    // if(this.props.selectedLayer === value) return;
    const history = this.props.history;
    const query = qs.parse(this.props.location.search.substr(1));
    const mergeQuery = { ...query, tabId: value };
    history.replace({ 
      pathname: '/exploracion', 
      search: `?${qs.stringify(mergeQuery)}`
    });
  }

  render() {
    // console.log('rendering LayersNavigationContainer');
    const { layers, tabId } = this.props;
    // const layers = this.props.layers;
    const nested = nest()
      .key(d => d.fuente)
      .sortKeys(ascending)
      .key(d => d.nombre)
      .sortKeys(ascending)
      .entries(layers);
    const onClick = this.onClick;
    // const activeTab = this.props.activeTab;
    const navigation = nested.map((v, i) => {
      const activeClass = tabId == i ? 'is-active' : '';
      return (
        <li key={`${i}-${v.key}`} className={activeClass}>
          <label>
            <input 
              style={{ display: 'none' }}
              type="radio"
              onChange={this.handleTabChange}
              name={'master__tab'} 
              value={i}/>
            {v.key}
          </label>
        </li>
      );
    });
    return (
      <div className="layers-navigation__container">
        <div className="tabs is-small">
          <ul>
            {navigation}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search.substr(1));
  const { tabId } = query;
  const { layers } = state.exploracion;
  return { layers, tabId };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(exploracionActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayersNavigationContainer));
