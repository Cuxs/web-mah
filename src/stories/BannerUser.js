import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Row>
    <div className="col-md-12" >
      <img src="http://placecage.com/c/1440/330" alt="banner" />
      <div className="banner-home" >
        <h3 className="title">
          Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!
        </h3>
        <Col md="3" sm="10" className="container-data-input-group" >
          <div className="cont-form" style={{marginTop: `70px`}}>
            <h5><strong>¡Registrate gratis!</strong></h5>
            <FormGroup>
              <Input type="email" name="email" placeholder="Email" />
            </FormGroup>
            <Button color="primary" href="/userRegisterS1" >Comenzar</Button>
          </div>
        </Col>
      </div>
    </div>
  </Row>
);

