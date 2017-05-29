import React, { PropTypes } from 'react';
import Step from './Step';

import vuelo from 'app-images/Selection_013.png';
import mapeo from 'app-images/Selection_014.png';
import amenaza from 'app-images/Selection_015.png';
import vulnerabilidad from 'app-images/Selection_016.png';
import analisis from 'app-images/Selection_017.png';
import retorno from 'app-images/Selection_018.png';

const Steps = () => {
  return (
    <div className="steps row">
      <Step 
        title="1) Vuelo" 
        img={vuelo} 
        desc="Sesion de mapeo con dron"/>
      <Step 
        title="2) Mapeo de Comunidad"
        img={mapeo}
        desc="Mapeo de servicios, caller y negocios"/>
      <Step 
        title="3) Amenazas" 
        img={amenaza} 
        desc="Mapeo de Amenazas"/>
      <Step
        title="4) Vulnerabilidad y Capacidades" 
        img={vulnerabilidad}
        desc="Vulnerabilidad, Capacidades y Riesgo"/>
      <Step 
        title="5) Analisis de Riesgo y Validacion" 
        img={analisis}
        desc="Validacion con otros miembros de la comunidad"/>
      <Step 
        title="6) Retorno de informacion" 
        img={retorno} 
        desc="Entregable para la comunidad"/>
    </div>
  );
};

export default Steps;

Steps.propTypes = {
};

Steps.defaultProps = {
};
