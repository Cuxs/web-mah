import React from 'react';
import { Row, Col } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="col-md-12 microsite-header" >
    <Row className="microsite-portrait">
      <img src="http://placecage.com/c/1920/330" alt="banner" width="100%"/>
    </Row>
    <div class="container">
      <Row className="microsite-data">
        <Col md="3" className="microsite-data-avatar">
          <img src="http://placecage.com/c/250/250" alt="banner" width="100%"/>
        </Col>
        <div className="col-md-9 container-data-input-group" >
          <h3><strong>NOMBRE DE LA AGENCIA</strong></h3>
          <Row>
            <Col md="4">
              <div className="data-input-group">
                <label>DOMICILIO</label>
                <p>Av. Mitre/ Av. Mitre, San Rafael, Mendoza</p>
              </div>
            </Col>
            <Col md="4">
              <div className="data-input-group">
                <label>TELÉFONO</label>
                <p>2604-4337724 / 2604-329383</p>
              </div>
            </Col>
            <Col md="4">
              <div className="data-input-group">
                <label>EMAIL</label>
                <p>automotoresmojacar@hotmail.com</p>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  </div>
);

