import React from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from 'common-redux/actions/exploracionActions';

class SearchBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    this.props.actions.fetchLocations(value);
  }

  render() {
    console.log(this.props);
    return (
      <div className="explore-sidebar__search">
        <form className="row explore__form">
          <div className="col-xs-10" style={{ paddingRight: 0 }}>
            <input onChange={this.onChange} className="full-width" type="text"/>
          </div>
          <div className="col-xs-2" style={{ paddingLeft: 0 }}>
            <input className="uppercase full-width full-height" type="button" value="Buscar"/>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { locations } = state.exploracion;
  return { locations };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(exploracionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

