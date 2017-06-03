import React from 'react';
import Section from './../Section';
import ZoomableMap from 'app-scripts/d3/ZoomableMap';

const Cover = () => {
  return (
    <Section id="landing__cover" classNames="landing__section">
      <div className="cover__image cover__image--main"/>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="landing__text">
              <h1 className="title is-spaced">Proceso de mapeo participativo</h1>
              <p className="subtitle">Soluciones tecnológicas para aumentar la resiliencia de los asentamientos latinoamericanos.</p>
              <a className="button">
                Ir al mapa
              </a>
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
