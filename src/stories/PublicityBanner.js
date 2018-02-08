import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Col md="12">
    <Row className="publicityBanner align-items-center">
      <div className="col-10">Comprá tu auto aquí y te financiamos hasta el 60%. <a href="/form" /> </div>
      <div className="col-2"><a href="/form"><img src="/assets/images/icon-arrow-right.svg" alt="Ir al formulario" /></a></div>
    </Row>
  </Col>
);

