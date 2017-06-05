import React from 'react';
import { Link } from 'react-router-dom';
import Section from './../Section';
import ZoomableMap from 'app-scripts/d3/ZoomableMap';
import logo from 'app-images/comapp_grey.png';

const defaultRoute = {
  pathname: '/exploracion',
  search: '?center=23.523700058824144%2C-101.898193359375&locationType=2&zoom=6&tabId=0&layerId=cpcarencias'
};

const Cover = () => {
  console.log('cover');
  return (
    <Section id="landing__cover" classNames="landing__section">
      <div className="cover__image cover__image--main"/>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="landing__text">
              <h1 className="title is-spaced">
                <img src={logo}/>
              </h1>
              <p className="subtitle">Soluciones tecnológicas para aumentar la resiliencia de los asentamientos latinoamericanos.</p>
              <Link className="button"  to={defaultRoute}>
                Ir al mapa
              </Link>
            </div>
          </div>
          <div className="column is-half is-hidden-touch" id="cover-map">
            <ZoomableMap parentContainerID="cover-map"/>
          </div>
        </div>
    </div>
  </Section>
  );
};

export default Cover;
