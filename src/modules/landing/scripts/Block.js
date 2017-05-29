import React, { PropTypes } from 'react';

const Block = ({ children, style }) => {
  return (
    <div className="block col-sm-12 col-md-4" style={style}>
      {children}
    </div>
  );
};

export default Block;

Block.propTypes = {
};

Block.defaultProps = {
};
