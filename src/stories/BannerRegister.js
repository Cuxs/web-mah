import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => (
  <div className="container-fluid">
    <Row className="banner-home align-items-center" style={{background: `url(http://placecage.com/c/1440/330) no-repeat center center`}}>
      <div className="col-md-4 col-sm-12 col-xs-12">
        <h3>Cambia la forma de comprar o vender tu auto</h3>
      </div>
      <div className="container-data-input-group col-md-4 col-sm-12 col-xs-12 float-right" >
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
      </div>
    </Row>
  </div>
);

