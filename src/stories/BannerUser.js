import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="container-fluid">
    <Row className="banner-home align-items-center" style={{background: `url(http://placecage.com/c/1440/330) no-repeat center center`}}>
      <div className="col-md-4 col-sm-12 col-xs-12">
        <h3>Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!</h3>
      </div>
      <div className="container-data-input-group col-md-4 col-sm-12 col-xs-12 float-right" >
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
);

