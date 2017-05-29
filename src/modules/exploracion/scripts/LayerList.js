import React, { PropTypes } from 'react';

export default class LayerList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { data, className, selectedLayer, onChange } = this.props;
    return (
      <div className={`explore__tab ${className}`}>
        {data.values.map((l, i) => <LayerDetail key={i} title={l.key} options={l.values} selectedLayer={selectedLayer} onChange={onChange}/>)}
      </div>
    );
  }
}

class LayerDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { title, options, selectedLayer, onChange } = this.props;
    return (
      <div className="layer__detail">
        <span className="layer__title">{title}</span>
        <div className="layer__options">
          {options.sort((a, b) => a.periodo - b.periodo).map((o, i) => <LayerOption {...o} key={i} selectedLayer={selectedLayer} onChange={onChange}/>)}
        </div>
      </div>
    );
  }
}

class LayerOption extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const checked = props.selectedLayer === props.id;
    const checkedClass = checked ? 'layer__option--active' : '';
    return (
      <div className={`layer__option ${checkedClass}`}>
        <label>
          {props.periodo}
          <input type="radio" onChange={props.onChange} name="layer__option" value={props.id} checked={checked}
/>
        </label>
      </div>
    );
  }
}
