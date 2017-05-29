import React, { PropTypes } from 'react';

const NewsItem = ({ title, img, desc }) => {
  return (
    <div className="news__item col-sm-12 col-md-3">
      <div style={{ height: '300px', width: '100%', background: '#ececec' }}/>
      <h2>{title}</h2>
      <p>{desc}</p>
      <span>Ver mas...</span>
    </div>
  );
};

export default NewsItem;

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

NewsItem.defaultProps = {
  title: '',
  img: '',
  desc: ''
};
