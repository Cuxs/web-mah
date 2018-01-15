import React from 'react';
import { Row, Col } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="col-md-12 container-header" >
    <Row>
      <img src="http://placecage.com/c/250/130" className="col-md-3" alt="banner" />
      <div className="header col-md-9" >
        <h3 className="title">Nombre de la agencia</h3>
        <Row>
          <Col md="4">
            <h6 className="title">DOMICILIO</h6>
            <h6 className="title">Av. Mitre/ Av. Mitre, San Rafael, Mendoza</h6>
          </Col>
          <Col md="4">
            <h6 className="title">TELÉFONO</h6>
            <h6 className="title">2604-4337724 / 2604-329383</h6>
          </Col>
          <Col md="4">
            <h6 className="title">EMAIL</h6>
            <h6 className="title">automotoresmojacar@hotmail.com</h6>
          </Col>
        </Row>
      </div>
      <style jsx>
        {`
        .container-header {
          margin-top: -45px;
        }
        .header {
          margin-top: 45px;
        }
        `}
      </style>
    </Row>
  </div>
);

