import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="container-fluid">
    <Row className="banner-home" style={{ background: 'url(/assets/images/image-free.png) no-repeat center center' }}>
      <div className="container">
        <Row className="align-items-center justify-content-between">
          <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
            <h3>Publicá gratis, sin registro. Vendé ya en Mi Auto Hoy!</h3>
          </div>
          <div className="container-data-input-group col-lg-4 col-md-5 col-sm-12 col-xs-12 align-self-end" >
            <div className="cont-form">
              <h5><strong>¡Publicá gratis ahora!</strong></h5>
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Usado</option>
                  <option>Nuevo</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Marca</option>
                  <option>BMW</option>
                  <option>Fiat</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Modelo</option>
                  <option>--</option>
                </Input>
              </FormGroup>
              <Button color="primary" href="/publicateWithoutRegister" >Comenzar</Button>
            </div>
          </div>
        </Row>
      </div>
    </Row>
  </div>
);

