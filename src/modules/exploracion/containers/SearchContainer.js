import React from 'react';
import AutoComplete from 'app-scripts/inputs/AutoComplete';
import debounce from 'lodash.debounce';
import { withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class SearchContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.debouncedChange = debounce(this.debouncedChange.bind(this), 300);
    this.onChange = this.onChange.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.state = {
      suggestionIndex: 0
    };
  }

  debouncedChange(e) {
    e.persist();
    this.onChange(e);
  }

  onChange(e) {
    this.props.actions.setSearchValue(e.target.value);
    this.props.actions.fetchSuggestions(e.target.value);
    this.setState({ suggestionIndex: 0 });
  }

  onClick(suggestion) {
    // console.log('click', suggestion);
    const { latitud, longitud, nombre } = suggestion.fields;
    const latlng = [+latitud, +longitud];
    this.props.actions.setSearchValue(nombre);
    this.props.actions.suggestionSuccess([]);
    // this.props.actions.fetchLocation(+this.props.location.query.locationType, suggestion.id, [+longitud, +latitud]);
    this.setState({ suggestionIndex: 0 });
  }

  renderSuggestion(r, i) {
    const { latitud, longitud, nombre, nom_ent } = r.fields;
    const suggestionIndex = this.state.suggestionIndex;
    const selectedClass = suggestionIndex === i ? 'search__result--active':'';
    const onClick = () => { 
      this.onClick(r);
    };
    return (
      <div key={r.id} className={`search__result ${selectedClass}`} onClick={onClick}>
        <span className="search__highlight">{nombre}</span>
        <span className="search__additional">{nom_ent}</span>
      </div>
    );
  }

  onBlur(e) {
    if(e.target.value === '') return;
    // console.log('blur');
    this.props.actions.suggestionSuccess([]);
  }

  onFocus(e) {
    if(e.target.value === '') return;
    // console.log('focus');
    this.props.actions.fetchSuggestions(e.target.value);
  }

  onKeyUp(e) {
    const suggestionIndex = this.state.suggestionIndex;
    if(e.key === 'Enter') {
      const suggestion = this.props.suggestions[suggestionIndex];
      const { latitud, longitud, nombre } = suggestion.fields;
      const latlng = [+latitud, +longitud];
      this.props.actions.setSearchValue(nombre);
      this.props.actions.suggestionSuccess([]);
      this.props.actions.fetchLocation(+this.props.location.query.locationType, suggestion.id, [+longitud, +latitud]);
      this.setState({ suggestionIndex: 0 });
    }
    if(e.key === 'ArrowDown') {
      if(suggestionIndex === this.props.suggestions.length - 1) return;
      this.setState({ suggestionIndex: suggestionIndex + 1 });
    }
    if(e.key === 'ArrowUp') {
      if(suggestionIndex === 0) return;
      this.setState({ suggestionIndex: suggestionIndex - 1 });
    }
  }


  render() {
    const suggestions = this.props.suggestions;
    return (
      <div className="search__container">
        <AutoComplete suggestions={suggestions} 
          renderSuggestion={this.renderSuggestion} 
          value={this.props.searchValue}
          index={1}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyUp}
          onFocus={this.onFocus}
          onChange={this.onChange} 
          onClick={this.onClick}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { locationType, searchValue, suggestions } = state.exploracion;
  return { locationType, searchValue, suggestions };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchContainer));
