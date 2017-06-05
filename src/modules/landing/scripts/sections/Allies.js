import React from 'react';
import { Link } from 'react-router-dom';
import Section from './../Section';

import codeando from 'app-images/codeando_logo.png';
import observatorio from 'app-images/observatorio_logo.png';
import perpendicular from 'app-images/perpendicular_logo.png';
import techo from 'app-images/techo_logo.png';
import retos from 'app-images/retos_logo.png';


const Allies = () => {
  return (
    <Section id="landing__allies" classNames="landing__section">
      <div className="cover__image cover__image--main"/>
      <div className="container">
        <div className="columns">
          <div className="column is-12">
            <section className="hero">
              <div className="hero-body">
                <h1 className="title">
                  ¿Cómo funciona?
                </h1>
                <h2 className="subtitle">Co-Mapp aborda la falta de información de los asentamientos en situación de marginación en Latinoamérica para fomentar el desarrollo comunitario y aumentar la resiliencia de comunidades ante riesgos naturales, humanos y causados por el cambio climático.</h2>
              </div>
            </section>
          </div>
        </div>
        <div className="columns landing__allies">
          <div className="column is-4">
            <img src={codeando}/>
          </div>
          <div className="column is-4">
            <img src={observatorio}/>
          </div>
          <div className="column is-4">
            <img src={perpendicular}/>
          </div>
        </div>
        <div className="columns landing__allies">
          <div className="column is-4">
            <img src={techo}/>
          </div>
          <div className="column is-4">
            <img src={retos}/>
          </div>
        </div>
    </div>
  </Section>
  );
};

export default Allies;
