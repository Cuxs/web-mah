import React from 'react';
import { Col, Row } from 'reactstrap';
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
        <h5>Gratis e ilimitado</h5>
        <p>Podes crear todas las publicaciones que desees de manera gratuita y sin limitaciones.</p>
      </Col>
    </Col>
    <Col sm="4" xs="12" style={style.containerCredit} >
      <Col md="4" >
        <img src="http://placecage.com/c/80/80" style={style.imgCredit} alt="banner" />
      </Col>
      <Col md="8">
        <h5>Panel administrativo</h5>
        <p>Podés controlar todas tus publicaciones desde un panel de control</p>
      </Col>
    </Col>
    <Col sm="4" xs="12" style={style.containerCredit} >
      <Col md="4" >
        <img src="http://placecage.com/c/80/80" style={style.imgCredit} alt="banner" />
      </Col>
      <Col md="8">
        <h5>Chat con interesado</h5>
        <p>Respondé de manera fácil y rápida a tus interesados. Toda la comunicación en un solo lugar.</p>
      </Col>
    </Col>
  </Row>
);

