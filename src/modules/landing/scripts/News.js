import React, { PropTypes } from 'react';
import NewsItem from './NewsItem';

const News = () => {
  return (
    <div className="news row">
      <NewsItem
        title="Version 0.1 arriba"
        desc="La version 0.1 de la plataforma esta al fin en la nube, durante esta etapa vamos a ..."
      />
      <NewsItem
        title="Propuesta de API de grafos"
        desc="Neo4j nos ha permitido realizar muchas operaciones que serian tediosas en el esquema relacional..."
      />
      <NewsItem
        title="Version 0.1 arriba"
        desc="La version 0.1 de la plataforma esta al fin en la nube, durante esta etapa vamos a ..."
      />

      <NewsItem
        title="Entendiendo los Indices de Riesgo"
        desc="Que es un indice y porque es importante para el desarrollo de un estado/muncipio..."
      />
    </div>
  );
};

export default News;
