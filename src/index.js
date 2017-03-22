import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import configureStore from 'app-redux/store.js';
import Exploracion from 'app-modules/exploracion';

import normalize from '../node_modules/normalize.css/normalize.css';
import appStyles from 'app-styles/general.scss';
import mapStyles from 'app-styles/leaflet.scss';

import comapp_logo from 'app-images/dataquito-logo.png';
const store = configureStore();

render (
  <Provider store={store}>
    <Router>
      <div id="comapp__container">
        <div id="navigation">
          <img className="logo" src={comapp_logo}/>
        </div>
        <Route exact path="/exploracion" component={Exploracion}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('comapp__container')
);
