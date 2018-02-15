import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="container-fluid">
    <Row className="banner-home" style={{ background: 'url(/assets/images/image-user.png) no-repeat center center' }}>
      <div className="container">
        <Row className="align-items-center justify-content-between">
          <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
            <h3>Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!</h3>
          </div>
          <div className="container-data-input-group col-lg-4 col-md-5 col-sm-12 col-xs-12 float-right" >
            <div className="cont-form">
              <h5><strong>¡Registrate gratis!</strong></h5>
              <FormGroup>
                <Input type="email" name="email" placeholder="Email" />
              </FormGroup>
              <Button color="primary" href="/userRegisterS1" >Comenzar</Button>
            </div>
          </div>
        </Row>
      </div>

    </Row>
  </div>
);

