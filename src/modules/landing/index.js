import React from 'react';
import styles from './styles/landing.css';
import Navigation from 'app-scripts/core/Navigation';
import Footer from 'app-scripts/core/Footer';

import Cover from './scripts/sections/Cover';
import About from './scripts/sections/About';
import How from './scripts/sections/How';
import Questions from './scripts/sections/Questions';


class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id="landing__module">
        <Navigation style={{ position: 'absolute', width: '100%', top: 0, zIndex: 4 }}/>
        <Cover/>
        <About/>
        <How/>
        <Questions/>
        <Footer/>
      </div>
    );
  }
}


export default Landing;
