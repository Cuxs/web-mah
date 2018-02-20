import React from 'react';
import { Col, Row, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

const style = {
  container: {
    padding: '15px',
    paddingLeft: '45px',
    paddingRight: '45px',
  },
  containerCredit: {
    display: 'flex',
    flexDirection: 'row',
  },
  imgCredit: {
    borderRadius: '40px',
  },
};

export default ({ history }) => (
  <div className="container-fluid">
    <Row className="home-posibilities">
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between" style={{height:'100%'}}>
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/images/icon-home-1.png" srcSet="/assets/images/icon-home-1@2x.svg"  alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12" className="helper-align-flexs">
            <h5>Créditos Prendarios </h5>
            <p>Créditos a tu medida, a las tazas más bajas y hasta con 60 meses de plazo.</p>
            <Button color="primary" onClick={() => history.push('/pledgeCredits')} className="align-self-end"> Consultá</Button>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between" style={{height:'100%'}}>
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/images/icon-home-2.png" srcSet="/assets/images/icon-home-2@2x.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12" className="helper-align-flexs">
            <h5>Personal Shopper </h5>
            <p>¿Cansado de buscar? Te ayudamos a buscar un auto a tu medida asesorándote en cada proceso.</p>
            <Button color="primary" onClick={() => history.push('/personalShopperS1')} className="align-self-end"> Consultá</Button>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between" style={{height:'100%'}}>
          <Col md="4" sm="3" xs="12" className="text-right">
            <img src="/assets/images/icon-home-3.png" srcSet="/assets/images/icon-home-3@2x.svg" alt="banner" />
          </Col>
          <Col md="8" sm="9" xs="12" className="helper-align-flexs">
            <h5>Créditos de libre destino</h5>
            <p>Hacé con tu préstamo lo que desees y lo que siempre soñaste.</p>
            <Button color="primary" onClick={() => history.push('/freeDestinationCredits')} className="align-self-end"> Consultá</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

