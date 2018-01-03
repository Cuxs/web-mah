import React from 'react';
import { Col, Row, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


export default () => (
  <div>
    <Row>
      <Col lg="4" md="4" sm="4" xs="12">
        <h5>Créditos Prendarios </h5>
        <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al</p>
        <Button color="primary"> Consultá</Button>


      </Col>
      <Col lg="4" md="4" sm="4" xs="12">
        <h5>Personal Shopper </h5>
        <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <Button color="primary"> Contactar</Button>

      </Col>
      <Col lg="4" md="4" sm="4" xs="12">
        <h5>Créditos de libre destino</h5>
        <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <Button color="primary">Solicitar</Button>

      </Col>
    </Row>
  </div>
);

