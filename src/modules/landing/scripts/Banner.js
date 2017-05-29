import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="banner">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left' }}>
        <h4>Que es CO-MAPP</h4>
        <span>To support efficient, effective, and coordinated humanitarian response through the sharing of operational information</span>
        <a className="button" href="https://www.youtube.com/watch?v=M5RvGv6jxDo">Ver Video</a>
      </div>
    </div>
  );
};

export default Banner;
