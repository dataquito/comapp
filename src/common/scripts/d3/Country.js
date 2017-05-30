import React from 'react';
import { geoMercator, geoAlbersUsa, geoPath } from 'd3-geo';
import { mesh, merge, feature } from 'topojson';

const Country = ({ className, d, onClick, selected }) => {
  const selectedClass = selected ? 'country--selected' : '';
  const classes = [className, selectedClass].join(' ');
  return (
    <path 
      className={classes}
      d={d}
      onClick={onClick}
    />
  );
};

export default Country;

