import React from 'react';
import { Link } from 'react-router-dom';
import Steps from './scripts/Steps';
import News from './scripts/News';
import Allies from './scripts/Allies';
import Banner from './scripts/Banner';
import Block from './scripts/Block';
import MainBanner from './scripts/MainBanner';

const urlJSON = require('./jsons/p.json');

import styles from './styles/landing.css';
import logoImg from 'app-images/comapp_grey.png';
import ZoomableMap from 'app-scripts/d3/ZoomableMap';
import SizingHOC from 'app-scripts/hocs/SizingHOC';
import Navigation from 'app-scripts/core/Navigation';

class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id="landing__module">
        <div id="cover__image"/>
        <Navigation/>
        <section className="container" id="landing__cover">
          <div className="columns">
            <div className="column">
              <div className="landing__text">
                <h1 className="title is-1">
                  Proceso de mapeo participativo
                </h1>
                <p className="subtitle is-5">
                  Use high tech to propose innovative solutions to social issues such as poverty and inequality
                </p>
                <a className="button is-success is-outlined">
                  Button
                </a>
              </div>
            </div>
            <div className="column is-half" id="cover-map">
              <ZoomableMap parentContainerID="cover-map"/>
            </div>
          </div>
        </section>
        <section style={{ width: '100%', height: '100vh' }}/>
      </div>
    );
  }
}


export default Landing;
