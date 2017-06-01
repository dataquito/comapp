import React from 'react';
import { Link } from 'react-router-dom';
import Steps from './scripts/Steps';
import News from './scripts/News';
import Allies from './scripts/Allies';
import Banner from './scripts/Banner';
import Block from './scripts/Block';
import MainBanner from './scripts/MainBanner';

const urlJSON = require('./jsons/p.json');

import styles from './styles/landing.css';
import logoImg from 'app-images/comapp_grey.png';
import ZoomableMap from 'app-scripts/d3/ZoomableMap';
import SizingHOC from 'app-scripts/hocs/SizingHOC';
class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div id="landing__module">
        <nav>
          <div className="container">
            <div className="row">
              <div className="col-sm-1">
                <img className="logo" src={logoImg}/>
              </div>
              <div className="col-sm-11">
              </div>
            </div>
          </div>
        </nav>
        <section id="cover-map" className="cover">
          <ZoomableMap parentContainerID="cover-map"/>
          {/*<div className="cover__image"/>*/}
          {/*<div className="cover__elements">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12">
                  <div className="cover__text">
                    <h1>Streamline your workflow with Comapp</h1>
                    <p className="lead">Use high tech to propose innovative solutions to social issues such as poverty and inequality</p>
                    <a className="btn btn--primary type--uppercase" href="index.html">
                      <span className="btn__text">
                        View The Demos
                      </span>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ZoomableMap/>
                </div>
              </div>
            </div>
          </div>*/}
        </section>
        {/*<div className="m">
          <div className="container">
            <MainBanner/>
          </div>
        </div>
        <div className="section" style={{background: `url(http://futureaerial.com/wp-content/uploads/2015/10/celtic_manor_2010_wireframe.jpg) no-repeat center center fixed`,  backgroundSize: 'cover' }}>
          <Banner/>
        </div>
        <div className="">
          <h5 style={{ marginLeft: '40px' }} className="landing__title">¿Cómo funciona?</h5>
          <Steps/>
        </div>
        <div className="">
          <div className="row">
            <Block>
              <h1>¿Eres una organización?</h1>
              <img src="https://www.focusforhealth.org/wp-content/uploads/2014/12/2015_6_2-VAERS-Picture.jpg"/>
              <i/>
            </Block>
            <Block style={{ borderLeft: '4px solid #fff', borderRight: '4px solid #fff' }}>
              <h1>¿No eres organización y quieres medir tus riesgos?</h1>
              <img src="http://static.ccm2.net/ccm.net/faq/images/9166-zk6JQhPuu2fhJvMT-s-.png"/>
            </Block>
            <Block>
              <h1>Descárga la app</h1>
              <img src="http://mooxidesign.com/wp-content/uploads/2014/08/Samsung-Galaxy-S4-Flat-Mockup.jpg"/>
            </Block>
          </div>
        </div>
        <div className="section">
          <h5 className="landing__title">Noticias</h5>
          <News/>
        </div>
        <div className="section">
          <h5 className="landing__title">Organizaciones aliadas</h5>
          <Allies/>
        </div>*/}
      </div>
    );
  }
}


export default Landing;
