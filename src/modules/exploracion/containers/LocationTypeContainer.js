import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import Radio from 'app-scripts/inputs/Radio';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class LocationTypeContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const actions = this.props.actions;
    const value = +e.target.value;
    const history = this.props.history;
    const query = qs.parse(this.props.location.search.substr(1));
    const mergeQuery = { ...query, locationType: value };
    actions.fetchLayers(value);
    history.push({ 
      pathname: '/exploracion',
      search: `?${qs.stringify(mergeQuery)}`
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.locationType !== nextProps.locationType;
  }

  render() {
    const selected = this.props.locationType;
    const radios = [
      { title: 'Estatal', value: 1 },
      { title: 'Municipal', value: 2 }
    ].map((v, i) => {
      return (
        <div key={v.title} className="column is-6">
          <Radio key={i} 
            title={v.title} 
            value={v.value} 
            selected={selected === v.value} 
            onChange={this.onChange}
            customClass={''}
            name="locationType"/>
        </div>
      );
    });
    return (
      <div className="location-type__container">
        <div className="location-type__options columns">
          {radios}
        </div>
      </div>
    );
  }
}

LocationTypeContainer.propTypes = {
  locationType: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

LocationTypeContainer.defaultProps = {
  locationType: 1,
  actions: {}
};

const mapStateToProps = (state, ownProps) => {
  const query = qs.parse(ownProps.location.search.substr(1));
  const { locationType } = query;
  return { locationType: +locationType };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationTypeContainer));
