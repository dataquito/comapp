import React from 'react';
import styles from './styles/landing.css';
import Navigation from 'app-scripts/core/Navigation';
import Footer from 'app-scripts/core/Footer';

import Cover from './scripts/sections/Cover';
import About from './scripts/sections/About';
import How from './scripts/sections/How';
import Questions from './scripts/sections/Questions';
import Allies from './scripts/sections/Allies';


class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id="landing__module">
        <Navigation className="landing__navigation"/>
        <Cover/>
        <About/>
        <How/>
        <Questions/>
        <Allies/>
        <Footer/>
      </div>
    );
  }
}


export default Landing;
