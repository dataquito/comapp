import React from 'react';

const Tile = ({ classNames }) => {
  return (
    <div className="tile is-parent is-vertical">
      <article className="tile is-child notification is-primary">
        <p className="title">Vertical...</p>
        <p className="subtitle">Top tile</p>
      </article>
      <article className="tile is-child notification is-warning">
        <p className="title">...tiles</p>
        <p className="subtitle">Bottom tile</p>
      </article>
    </div>
  );
};

export default Tile;
