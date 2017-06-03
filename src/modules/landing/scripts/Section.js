import React from 'react';

const Section = ({ children, id, classNames }) => {
  return (
    <section id={id} className={classNames}>
      {children}
    </section>
  );
};

export default Section;
