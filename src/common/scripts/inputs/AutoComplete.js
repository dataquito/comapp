import React, { PropTypes } from 'react';
import debounce from 'lodash.debounce';

class AutoComplete extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const suggestions = props.suggestions.map(props.renderSuggestion);
    return (
      <div className={`autocomplete ${props.className}`}>
        <input type="text" {...this.props} className="autocomplete__input"/>
        <div className="autocomplete__suggestions">
          {suggestions}
        </div>
      </div>
    );
  }
}

/* eslint-disable no-console */
AutoComplete.defaultProps = {
  onFocus: e => {
    console.log('onFocus');
  },
  onClick: e => {
    console.log('onClick');
  },
  onKeyUp: e => {
    console.log('onKeyUp');
  },
  onBlur: e => {
    console.log('onBlur');
  },
  onChange: e => {
    console.log('onChange');
  },
  renderSuggestion: (s, i) => {
    const style = {
      border: '1px solid #222',
      padding: '10px'
    };
    return <div key={i} style={style}>{s}</div>;
  },
  suggestions: [
    'Remember',
    'to',
    'add',
    'your',
    'suggestion',
    'array'
  ],
  placeholder: 'Default placeholder for AutoComplete'
};

AutoComplete.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  placeholder:  PropTypes.string.isRequired
};
 export default AutoComplete;
