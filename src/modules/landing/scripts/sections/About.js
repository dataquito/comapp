import React from 'react';
import Section from './../Section';

const About = () => {
  return (
    <Section id="landing__about" classNames="landing__section colored">
      <div className="cover__image cover__image--about"/>
      <div className="container container--about is-full-height">
        <div className="columns">
          <div className="column is-half is-center--vertical">
            <h1 className="title is-spaced">¿Que es Co-Mapp?</h1>
            <h2 className="subtitle">Es una metodología de resiliencia, empoderamiento e información para promover los derechos de las personas al hacer análisis de riesgos participativo en comunidades diversas de Latinoamérica.</h2>
            <h2 className="subtitle">Co-mapp cuenta con una metodología de mapeo de riesgos, una App móvil que permite una rápida recolección y análisis de datos y una plataforma WEB que recopila información comparable de todo el continente y agiliza la creación de perfiles de riesgo.</h2>
          </div>
          <div className="column is-half">
            <div className='embed-container'>
              <iframe src='https://www.youtube.com/embed//M5RvGv6jxDo' frameBorder='0' allowFullScreen/>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
