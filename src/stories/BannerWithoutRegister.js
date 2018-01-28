import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Row>
    <div className="col-md-12" >
      <img src="http://placecage.com/c/1440/330" alt="banner" />
      <div className="banner-home" >
        <h3 className="title">
          Publicá gratis, sin registro
        </h3>
        <Col md="3" sm="10" className="container-data-input-group" >
          <div className="cont-form" style={{marginTop: `30px`}}>
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
        </Col>
      </div>
    </div>
  </Row>
);

