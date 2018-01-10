import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import style from '../Styles/search';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Row style={style.header} >
    <Col md="6">
      <p >Mi auto Hoy</p>
    </Col>
    <Col md="6" className="flex-row" >
      <Button color="secondary">BENEFICIOS</Button>
      <Button color="secondary">PLANES</Button>
      <Button color="secondary">AYUDA</Button>
      <Button color="secondary">INICIAR SESIÓN</Button>
    </Col>
  </Row>
);
