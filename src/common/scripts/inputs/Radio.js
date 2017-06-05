import React, { PropTypes } from 'react';

const Radio = ({ title, customClass, groupName, selected, onChange, value }) => {
  const activeClass = selected ? 'radio--active' : '';
  return (
    <div className="field">
      <p className="control">
        <label className={`radio button is-small ${activeClass}`}>
          <input 
            style={{ display: 'none' }}
            type="radio"
            checked={selected}
            onChange={onChange}
            name={groupName} 
            value={value}
          />
          {title}
        </label>
      </p>
    </div>
  );
};

Radio.PropTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  customClass: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

Radio.defaultProps = {
  title: 'Default Label',
  value: 'key',
  groupName: 'default-name',
  customClass: 'radio__block--clean',
  selected: false,
  onChange: e => {
    console.log(e);
  }
};

export default Radio;
