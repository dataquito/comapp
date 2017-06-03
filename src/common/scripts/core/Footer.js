import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p><strong>Comapp</strong> es desarrollado por <a href="http://jgthms.com">El Observatorio de Vivienda</a> en conjunto con <a href="http://jgthms.com">Dataquito</a>.</p>
          <p>The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.</p>
          <a className="icon" href="https://github.com/jgthms/bulma">
            <i className="fa fa-github"/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
