import React, { PropTypes } from 'react';
import Radio from 'common-scripts/inputs/RadioSedesol';

export default class LayerList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <div className="layer__tab">
          <h5>CONEVAL</h5>
          <p>I've built a JSON object that has the name of the fruit, an array that shows the months that the fruit is in season and a boolean set to false.</p>
        </div>
        <div className="layer__tab layer__tab--active">
          <h5>Cobertura Social</h5>
          <p>And them I'm leveraging that data against the JSON object to change the boolean value to true if the month is equal to any value within the ripeMonths</p>
        </div>
        <div className="layer__tab">
          <h5>Economia y Crecimiento</h5>
          <p>I've read so far points me towards us jQuery's .data(key, value), but I can't figure out how to make it work.</p>
        </div>
      </div>
    );
  }
}
