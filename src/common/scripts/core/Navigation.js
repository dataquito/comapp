import React from 'react';
import logo from 'app-images/dataquito-logo.png';

const Navigation = () => {
  return (
    <nav className="nav container">
      <div className="nav-left">
        <a className="nav-item">
          <img src={logo} alt="Bulma logo"/>
        </a>
      </div>
      <div className="nav-center">
        <a className="nav-item">
          <span className="icon">
            <i className="fa fa-github"></i>
          </span>
        </a>
        <a className="nav-item">
          <span className="icon">
            <i className="fa fa-twitter"></i>
          </span>
        </a>
      </div>
      <span className="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div className="nav-right nav-menu">
        <a className="nav-item">
          Home
        </a>
        <a className="nav-item">
          Documentation
        </a>
        <a className="nav-item">
          Blog
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
