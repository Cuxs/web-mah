import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => (
  <Row>
    <div className="col-md-12" >
      <img src="http://placecage.com/c/1440/330" alt="banner" />
      <div className="banner-home" >
        <h3 className="title">
          Cambia la forma de comprar o vender tu auto
        </h3>
        <Col md="3" sm="10" className="container-data-input-group" >
          <div className="cont-form">
            <h5><strong>¡Registrate gratis y empezá a vender ahora!</strong></h5>
            <FormGroup>
              <Input type="text" name="agencyName" placeholder="Nombre de la Consecionaria" />
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" placeholder="Email" />
            </FormGroup>
            <Button color="primary" className="btn-block" href="/agencyRegisterS1" >Comenzar</Button>
          </div>
        </Col>
      </div>
    </div>
  </Row>
);

