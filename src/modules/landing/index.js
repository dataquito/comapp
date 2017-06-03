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
import Card from 'app-scripts/core/Card';

import vuelo from 'app-images/Selection_013.png';
import mapeo from 'app-images/Selection_014.png';
import amenaza from 'app-images/Selection_015.png';
import vulnerabilidad from 'app-images/Selection_016.png';
import analisis from 'app-images/Selection_017.png';
import retorno from 'app-images/Selection_018.png';


class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  scrollToSection() {
    document.getElementById("about").scrollIntoView();
  }

  render() {
    return (
      <div id="landing__module">
        <Navigation style={{ position: 'absolute', width: '100%', top: 0, zIndex: 4 }}/>
        <section id="landing__cover" className="landing__section">
          <div className="cover__image cover__image--main"/>
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="landing__text">
                  <h1 className="title is-spaced">
                    Proceso de mapeo participativo
                  </h1>
                  <p className="subtitle">
                    Soluciones tecnológicas para aumentar la resiliencia de los asentamientos latinoamericanos.
                  </p>
                  <a className="button" onClick={this.scrollToSection}>
                    Ir al mapa
                  </a>
                </div>
              </div>
              <div className="column is-half is-hidden-touch" id="cover-map">
                <ZoomableMap parentContainerID="cover-map"/>
              </div>
            </div>
          </div>
        </section>
        <section id="landing__about"  className="landing__section colored">
          <div className="cover__image cover__image--about"/>
          <div className="container container--about is-full-height">
            <div className="columns">
              <div className="column is-half is-center--vertical">
                <h1 className="title is-spaced">¿Que es Co-Mapp?</h1>
                <h2 className="subtitle">Es una metodología de resiliencia, empoderamiento e información para promover los derechos de las personas al hacer análisis de riesgos participativo en comunidades diversas de Latinoamérica.</h2>
                <h2 className="subtitle">Co-mapp cuenta con una metodología de mapeo de riesgos, una App móvil que permite una rápida recolección y análisis de datos y una plataforma WEB que recopila información comparable de todo el continente y agiliza la creación de perfiles de riesgo.</h2>
              </div>
              <div className="column is-half">
                <img src="http://www.iptimize.com/wp-content/uploads/2015/05/viedo.png"/>
              </div>
            </div>
          </div>
        </section>
        <section className="landing__section" id="landing__how">
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
        </section>
        <section id="landing__questions"  className="landing__section colored">
          <div className="cover__image cover__image--questions"/>
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-vertical is-12">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification">
                      <h1 className="title is-spaced">Eres una Organización</h1>
                      <p className="subtitle is-6">El proceso de mapeo participativo es realizado directamente por las organizaciones que trabajan en campo.</p>
                      <p className="subtitle is-6">Este proceso, es vital para la comunidad y para la organización ya que resulta la base del conocimiento mutuo y generación de la confianza.</p>
                      <p className="subtitle is-6">Si eres una organización y quieres capacitarte en la metodología y el uso de la tecnología para mapear las comunidades en la que tu organización trabaja, contáctanos en: contacto@observatoriodevivienda.org</p>
                    </article>
                    <article className="tile is-child notification">
                      <h1 className="title is-spaced">No eres una organización</h1>
                      <ul className="landing__requirements" style={{ marginBottom: 15 }}>
                        <li>¿Conoces los riesgos de tu localidad?</li>
                        <li>¿Sabes cuáles son los principales riesgos de tu comunidad?</li>
                        <li>¿Tú o tu comunidad saben qué hacer en una situación de riesgo?</li>
                      </ul>
                      <p className="subtitle is-6">Si contestaste que NO a cualquiera de las preguntas anteriores y quieres aplicar el mapeo en tu comunidad consulta la siguiente guía y el toolkit CO-Mapp para que puedas mapear tus riesgos.</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child notification">
                      <p className="title has-text-centered">Descarga nuestra App</p>
                      <p className="subtitle has-text-centered">Version Alfa</p>
                      <figure className="image is-4by3">
                        <img src="https://image.flaticon.com/icons/svg/317/317626.svg"/>
                      </figure>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p><strong>Comapp</strong> es desarrollado por <a href="http://jgthms.com">El Observatorio de Vivienda</a> en conjunto con <a href="http://jgthms.com">Dataquito</a>.</p>
              <p>
                <p>
The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
                </p>
                <a className="icon" href="https://github.com/jgthms/bulma">
                  <i className="fa fa-github"></i>
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}


export default Landing;
