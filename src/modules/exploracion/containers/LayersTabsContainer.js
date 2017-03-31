import React, { PropTypes } from 'react';
import qs from 'qs';
import { nest } from 'd3-collection';
import { ascending } from 'd3-array';
import { withRouter, browserHistory } from 'react-router';
import LayerList  from './../scripts/LayerList';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class LayersTabsContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    if(this.props.selectedLayer === value) return;
    const history = this.props.history;
    const query = qs.parse(this.props.location.search.substr(1));
    const mergeQuery = { ...query, layerId: value };
    history.replace({ 
      pathname: '/exploracion', 
      search: `?${qs.stringify(mergeQuery)}`
    });
    this.props.actions.fetchLayerVector(value, query.locationType);
  }

  render() {
    const { layers, activeTab, selectedLayer } = this.props;
    const nested = nest()
      .key(d => d.fuente)
      .sortKeys(ascending)
      .key(d => d.nombre)
      .sortKeys(ascending)
      .entries(layers);

    const onChange = this.onChange;
    const tabs = nested.map((v, i) => {
      const activeClass = (activeTab === +i) ? 'explore__tab--active' : '';
      return <LayerList key={i} data={v} className={activeClass} selectedLayer={selectedLayer} onChange={onChange}/>;
    });
    return (
      <div className="explore__tabs">
        {tabs}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search.substr(1));
  const { layerId } = query;
  const { layers, activeTab } = state.exploracion;
  return { layers, activeTab, selectedLayer: layerId };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayersTabsContainer));
