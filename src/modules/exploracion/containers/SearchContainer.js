import React, { PropTypes } from 'react';
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
    this.debouncedChange = debounce(this.debouncedChange.bind(this), 400);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { value: '' };
  }

  handleChange(e) {
    e.persist();
    this.setState({ value: e.target.value });
    this.debouncedChange(e);
  }

  debouncedChange(e) {
    if(e.target.value === '') return;
    this.props.actions.fetchSuggestions(e.target.value);
  }

  handleClick(suggestion) {
    const { latitud, longitud, nombre } = suggestion.fields;
    const latlng = [+latitud, +longitud];
    const typeOfLocation = suggestion => {
      if('cve_mun' in suggestion.fields) {
        return 'm';
      }
      return 'e';
    };
    browserHistory.replace({ pathname: '/ubicacion', query: {
      ag: typeOfLocation(suggestion),
      id: suggestion.id
    }});
    this.props.actions.suggestionSuccess([]);
  }

  renderSuggestion(r, i) {
    // console.log(r.highlights.nombre.match(/(\*\#\*)(.*)(\*\%\*)/));
    // console.log(r.highlights.nombre.split(' '));
    const regex = /\*\#\*(.*)\*\%\*/;
    const suggestionTags = r.highlights.nombre.split(' ')
      .map(str => {
        let className = '';
        if(regex.test(str)) {
          var match = regex.exec(str);
          return (
            <span className="search__highlight">{match[1]}</span>
          );
        }
        return (
          <span>{str}</span>
        );
      });

    const { latitud, longitud, nombre, nom_ent } = r.fields;
    const suggestionIndex = this.state.suggestionIndex;
    const selectedClass = suggestionIndex === i ? 'search__result--active':'';
    const onClick = () => this.handleClick(r);
    return (
      <span key={r.id} className={`search__result ${selectedClass}`} onClick={onClick}>
        {suggestionTags}
        <span className="search__additional">{nom_ent}</span>
      </span>
    );
  }

  render() {
    return (
      <AutoComplete
        onChange={this.handleChange}
        placeholder="Busca el perfil de tu estado o municipio."
        className="autocomplete__landing"
        value={this.state.value}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.props.suggestions}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { suggestions } = state.exploracion;
  return { suggestions };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

SearchContainer.defaultProps = {
  suggestions: []
};

SearchContainer.propTypes = {
  suggestions: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchContainer));
