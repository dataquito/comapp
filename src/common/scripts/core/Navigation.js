import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'app-images/comapp_grey.png';

const Navigation = ({ style, className }) => {
  return (
    <div style={style} className={className}>
      <nav className="nav container">
        <div className="nav-left">
          <Link className="nav-item"  to="/">
            <img src={logo} alt="Bulma logo"/>
          </Link>
        </div>
        <div className="nav-center">
          <a className="nav-item" href="https://github.com/dataquito/comapp">
            <span className="icon">
              <i className="fa fa-github"></i>
            </span>
          </a>
          <a className="nav-item" href="https://twitter.com/observivienda">
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
          <a className="nav-item" href="http://Observatoriodevivienda.org">
            Observatorio
          </a>
        </div>
      </nav>

    </div>
  );
};

export default Navigation;
