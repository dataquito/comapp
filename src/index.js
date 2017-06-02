import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import configureStore from 'app-redux/store.js';
import Exploracion from 'app-modules/exploracion';
import Landing from 'app-modules/landing';

import bulma from '../node_modules/bulma/css/bulma.css';
import appStyles from 'app-styles/general.scss';
import mapStyles from 'app-styles/leaflet.scss';

import comapp_logo from 'app-images/dataquito-logo.png';
const store = configureStore();

render (
  <Provider store={store}>
    <Router>
      <div id="comapp__container">
        <Route path="/exploracion" component={Exploracion}/>
        <Route exact path="/" component={Landing}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('comapp__container')
);
