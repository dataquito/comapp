import React from 'react';

const getSuggestionValue = suggestion => {
  return suggestion.fields.nombre;
};

const renderSuggestion = suggestion => {
  return (
    <div>
      {suggestion.fields.nombre}
    </div>
  );
};

export default class AutoComplete extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const suggestions = this.props.suggestions.map(this.props.renderSuggestion);
    const { onBlur, onChange, onKeyUp, value } = this.props;
    return (
      <div className="autocomplete">
        <input onFocus={this.props.onFocus} onKeyUp={this.props.onKeyUp} onBlur={this.props.onBlur} onChange={this.props.onChange} value={this.props.value} type="text" placeholder='Busca una ubicacion'/>
        <div className="search__results">
          {suggestions}
        </div>
      </div>
    );
  }
}
