import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Popup } from 'react-leaflet';
import states from 'helpers/states';
import { browserHistory, withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exploracionActions from 'common-redux/actions/exploracionActions';

class PopUpContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    // console.log('popup did mount');
  }

  click() {
    const { cve_ent, cve_muni } = this.props.selectedFeature;
    const { locationType } = this.props;
    let ag = 'm';
    let id = cve_ent;
    // console.log('click', locationType);
    if(locationType === 1) {
      ag = 'e';
      id = cve_ent;
    }
    if(locationType === 2) {
      ag = 'm';
      id = cve_muni;
    }
    browserHistory.push({
      pathname: '/ubicacion',
      query: { id, ag }
    });
    this.props.actions.locationSuccess(null);
  }


  componentDidUpdate() {
    // console.log('popup didupdate');
    if(this.props.selectedFeature !== null) {
      // document.getElementById('ubicacion__detail').addEventListener('click', this.click);
    }
  }

  render() {
    console.info('rendering PopUpContainer');
    if(this.props.selectedFeature === null) return null;
    const latlng = this.props.selectedFeature.latlng;
    const position = [latlng[1], latlng[0]];
    if(this.props.locationType === 1) {
      const { cve_ent } = this.props.selectedFeature;
      const { vul_car_n_14, vul_car_p_14, vul_ing_n_14, vul_ing_p_14, pobreza_p_14,pobreza_n_14, pobreza_m_p_14,pobreza_m_n_14,pobreza_e_p_14,pobreza_e_n_14,plbm_p_14,plbm_n_14,plb_p_14,plb_n_14,no_pobv_p_14,no_pobv_n_14 } = this.props.selectedFeature;
      const values = this.props.selectedFeature[this.props.selectedLayer];
      return (
        <Popup position={position}>
          <div style={{ padding: '15px' }}>
            <span className="popup__title">{states[cve_ent]}</span>
            <span className="popup__variable"> Valor de la variable <span>{values}</span></span>
            <table className="popup__table">
              <tbody>
                <tr>
                  <td>Vul Car 14</td>
                  <td>{vul_car_p_14}</td>
                  <td>{vul_car_n_14}</td>
                </tr>
                <tr>
                  <td>Vul Ing 14</td>
                  <td>{vul_ing_p_14}</td>
                  <td>{vul_ing_n_14}</td>
                </tr>
                <tr>
                  <td>Pobreza P 14</td>
                  <td>{pobreza_p_14}</td>
                  <td>{pobreza_n_14}</td>
                </tr>
                <tr>
                  <td>Pobreza M 14</td>
                  <td>{pobreza_m_p_14}</td>
                  <td>{pobreza_m_n_14}</td>
                </tr>
                <tr>
                  <td>Pobreza E 14</td>
                  <td>{pobreza_e_p_14}</td>
                  <td>{pobreza_e_n_14}</td>
                </tr>
                <tr>
                  <td>PLBM 14</td>
                  <td>{plbm_p_14}</td>
                  <td>{plbm_n_14}</td>
                </tr>
                <tr>
                  <td>PLB 14</td>
                  <td>{plb_p_14}</td>
                  <td>{plb_n_14}</td>
                </tr>
                <tr>
                  <td>No Po 14</td>
                  <td>{no_pobv_p_14}</td>
                  <td>{no_pobv_n_14}</td>
                </tr>
              </tbody>
            </table>
            <button id='ubicacion__detail' onClick={this.click}>Ir a detalle de Ubicacion</button>
          </div>
        </Popup>
      );

    }
    if(this.props.locationType === 2) {
      const { nom_ent, nom_mun } = this.props.selectedFeature;
      const { vul_car_n_10, vul_car_p_10, vul_ing_n_10, vul_ing_p_10, pobreza_p_10,pobreza_n_10, pobreza_m_p_10,pobreza_m_n_10,pobreza_e_p_10,pobreza_e_n_10,plbm_p_10,plbm_n_10,plb_p_10,plb_n_10,no_pobv_p_10,no_pobv_n_10 } = this.props.selectedFeature;
      const values = this.props.selectedFeature[this.props.selectedLayer];
      return (
        <Popup position={position}>
          <div style={{ padding: '15px' }}>
            <span className="popup__title">{ nom_mun } <span>{ nom_ent }</span></span>
            <span className="popup__variable"> Valor de la variable <span>{values}</span></span>
            <table className="popup__table">
              <tbody>
                <tr>
                  <td>Vul Car 10</td>
                  <td>{vul_car_p_10}</td>
                  <td>{vul_car_n_10}</td>
                </tr>
                <tr>
                  <td>Vul Ing 14</td>
                  <td>{vul_ing_p_10}</td>
                  <td>{vul_ing_n_10}</td>
                </tr>
                <tr>
                  <td>Pobreza P 10</td>
                  <td>{pobreza_p_10}</td>
                  <td>{pobreza_n_10}</td>
                </tr>
                <tr>
                  <td>Pobreza M 10</td>
                  <td>{pobreza_m_p_10}</td>
                  <td>{pobreza_m_n_10}</td>
                </tr>
                <tr>
                  <td>Pobreza E 10</td>
                  <td>{pobreza_e_p_10}</td>
                  <td>{pobreza_e_n_10}</td>
                </tr>
                <tr>
                  <td>PLBM 10</td>
                  <td>{plbm_p_10}</td>
                  <td>{plbm_n_10}</td>
                </tr>
                <tr>
                  <td>PLB 10</td>
                  <td>{plb_p_10}</td>
                  <td>{plb_n_10}</td>
                </tr>
                <tr>
                  <td>No Po 10</td>
                  <td>{no_pobv_p_10}</td>
                  <td>{no_pobv_n_10}</td>
                </tr>
              </tbody>
            </table>
            <button id='ubicacion__detail' onClick={this.click}>Ir a detalle de Ubicacion</button>
          </div>
        </Popup>
      );
    }
  }
}

PopUpContainer.propTypes = {
};

PopUpContainer.defaultProps = {
};

const mapStateToProps = (state, ownProps) => {
  const { locationType, layerId } = ownProps.location.query;
  const { selectedFeature } = state.exploracion;
  return { selectedFeature, locationType: +locationType, selectedLayer: layerId };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(exploracionActions, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PopUpContainer));
