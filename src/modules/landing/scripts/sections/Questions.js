import React from 'react';
import Section from './../Section';

const Questions = () => {
  return (
    <Section id="landing__questions" classNames="landing__section section-is-centered colored">
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
                  <a href="https://s3.amazonaws.com/co-mapp/manuales/CoMapp.pdf">Descarga el manual</a>
                </article>
                <article className="tile is-child notification">
                  <h1 className="title is-spaced">No eres una organización</h1>
                  <ul className="landing__requirements" style={{ marginBottom: 15 }}>
                    <li>¿Conoces los riesgos de tu localidad?</li>
                    <li>¿Sabes cuáles son los principales riesgos de tu comunidad?</li>
                    <li>¿Tú o tu comunidad saben qué hacer en una situación de riesgo?</li>
                  </ul>
                  <p className="subtitle is-6">Si contestaste que NO a cualquiera de las preguntas anteriores y quieres aplicar el mapeo en tu comunidad consulta la siguiente guía y el toolkit CO-Mapp para que puedas mapear tus riesgos.</p>
                  <a href="https://s3.amazonaws.com/co-mapp/manuales/Toolkit+Co-Mapp.pdf">Descarga el toolkit</a>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification">
                  <p className="title has-text-centered">Descarga nuestra App</p>
                  <p className="subtitle has-text-centered">
                    <a href="https://s3.amazonaws.com/co-mapp/app/co-mapp062017.apk">
                      Version Alfa
                    </a>
                  </p>
                  <figure className="image is-4by3">
                    <img src="https://image.flaticon.com/icons/svg/317/317626.svg"/>
                  </figure>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Questions;
