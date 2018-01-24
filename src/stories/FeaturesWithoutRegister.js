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

export default () => (
  <Row style={style.container} >
    <Col sm="4" xs="12" style={style.containerCredit} >
      <Col md="4" >
        <img src="http://placecage.com/c/80/80" style={style.imgCredit} alt="banner" />
      </Col>
      <Col md="8">
        <h5>Publicación gratis</h5>
        <p>Podes crear una publicación rápido y fácil.</p>
      </Col>
    </Col>
    <Col sm="4" xs="12" style={style.containerCredit} >
      <Col md="4" >
        <img src="http://placecage.com/c/80/80" style={style.imgCredit} alt="banner" />
      </Col>
      <Col md="8">
        <h5>Inmediata</h5>
        <p>Podés publicar tu auto de manera inmediata sin necesidad de registrarte.</p>
      </Col>
    </Col>
    <Col sm="4" xs="12" style={style.containerCredit} >
      <Col md="4" >
        <img src="http://placecage.com/c/80/80" style={style.imgCredit} alt="banner" />
      </Col>
      <Col md="8">
        <h5>60 días</h5>
        <p>Tu anuncio estará expuesto durante 60 días. Vende fácil y rápido.</p>
      </Col>
    </Col>
  </Row>
);

