import React, { PropTypes } from 'react';
import ReactSpinkit from 'react-spinkit';

const Spinner = ({ type }) => <div className="spinner__sedesol"><ReactSpinkit spinnerName={type} /></div>;

Spinner.defaultProps = {
  type: 'wave'
};

Spinner.propTypes = {
  type: PropTypes.string.isRequired
};

export default Spinner;
