import React, { PropTypes } from 'react';

const Step = ({ title, img, desc }) => {
  return (
    <div className="step col-sm-12 col-md-2">
      <div className="step__title" >
        <span>{title}</span>
      </div>
      <div className="step__content" >
        <img src={img}/>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default Step;

Step.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

Step.defaultProps = {
  title: '',
  img: '',
  desc: ''
};
