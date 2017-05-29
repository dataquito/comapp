import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import comapp_logo from 'app-images/dataquito-logo.png';

const MainBanner= () => {
  return (
    <div className="main__banner">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left' }}>
        <img style={{ margin: '30px 0'}} className="logo" src={comapp_logo}/>
        <h3 style={{ margin: '30px 0'}}>To support efficient, effective, and coordinated humanitarian response through the sharing of operational information</h3>
        <Link to="exploracion?center=20.512587%2C-101.097126&locationType=1&zoom=10" className="button">Ir a mapa</Link>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img src="http://blog.starsunflowerstudio.com/wp-content/uploads/2013/06/free-psd-apple-screen-monitor-ios-flat.png"/>
      </div>
    </div>
  );
};

export default MainBanner;
