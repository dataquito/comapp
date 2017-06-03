import React from 'react';
import Section from './../Section';
import vuelo from 'app-images/Selection_013.png';
import mapeo from 'app-images/Selection_014.png';
import amenaza from 'app-images/Selection_015.png';
import vulnerabilidad from 'app-images/Selection_016.png';
import analisis from 'app-images/Selection_017.png';
import retorno from 'app-images/Selection_018.png';


const How = () => {
  return (
    <Section id="landing__how" classNames="landing__section">
      <div className="cover__image cover__image--how"/>
      <div className="container container--how">
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
        <div className="columns">
          <div className="column is-2 step">
            <h3>1) Vuelo</h3>
            <div>
              <img src={vuelo}/>
            </div>
            <p>Sesión de mapeo con Drone.</p>
          </div>
          <div className="column is-2 step">
            <h3>2) Mapeo de Comunidad</h3>
            <div>
              <img src={mapeo}/>
            </div>
            <p>Mapeo de servicios, calles y negocios</p>
          </div>
          <div className="column is-2 step">
            <h3>3) AMENAZAS</h3>
            <div>
              <img src={amenaza}/>
            </div>
            <p>Mapeo de Amenazas.</p>
          </div>
          <div className="column is-2 step">
            <h3>4) Vulnerabilidad y capacidades</h3>
            <div>
              <img src={vulnerabilidad}/>
            </div>
            <p>Vulnerabilidad, Capacidades y Riesgo</p>
          </div>
          <div className="column is-2 step">
            <h3>5) Análisis de riesgo y validación</h3>
            <div>
              <img src={analisis}/>
            </div>
            <p>Validación con otros miembros de la comunidad</p>
          </div>
          <div className="column is-2 step">
            <h3>6) Retorno de información</h3>
            <div>
              <img src={retorno}/>
            </div>
            <p className="subtitle is-6">Entregable para la comunidad</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default How;
