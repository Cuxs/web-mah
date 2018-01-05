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
        <h5>Créditos Prendarios </h5>
        <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al</p>
        <Button color="primary"> Consultá</Button>
      </Col>
    </Col>
    <Col sm="4" xs="12" style={style.containerCredit} >
      <Col md="4" >
        <img src="http://placecage.com/c/80/80" style={style.imgCredit} alt="banner" />
      </Col>
      <Col md="8">
        <h5>Personal Shopper </h5>
        <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al</p>
        <Button color="primary"> Consultá</Button>
      </Col>
    </Col>
    <Col sm="4" xs="12" style={style.containerCredit} >
      <Col md="4" >
        <img src="http://placecage.com/c/80/80" style={style.imgCredit} alt="banner" />
      </Col>
      <Col md="8">
        <h5>Créditos de libre destino</h5>
        <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al</p>
        <Button color="primary"> Consultá</Button>
      </Col>
    </Col>
  </Row>
);

