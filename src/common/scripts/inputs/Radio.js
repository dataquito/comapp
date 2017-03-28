import React, { PropTypes } from 'react';

const Radio = ({ title, customClass, groupName, selected, onChange, value }) => {
  const activeClass = selected ? 'radio--active' : '';
  return (
    <div className={`radio ${activeClass} ${customClass}`}>
      <label>
        <div className="radio__name">
          <span>{title}</span>
        </div>
        <div className="radio__input">
          <input checked={selected}
            type="radio" 
            onChange={onChange}
            name={groupName} 
            value={value}/>
        </div>
      </label>
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
