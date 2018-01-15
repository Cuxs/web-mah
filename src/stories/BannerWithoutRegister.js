import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Row>
    <div className="col-md-12" >
      <img src="http://placecage.com/c/1440/330" alt="banner" />
      <div className="container-banner" >
        <h3 className="title">
          Publicá gratis, sin registro
        </h3>
        <h3 className="title">
          Vendé ya en Mi Auto Hoy!
        </h3>
        <Col md="3" sm="10" className="container-login" >
          <h5>¡Publicá gratis ahora!</h5>
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
        </Col>
      </div>
    </div>
    <style jsx>
      {`
        .container-banner {
          position: absolute;
          display: flex;
          flex-direction: row;
          top: 0px;
          bottom: 0px;
          left: 10px;
          right: 10px;
          align-items: center;
          justify-content: space-between
        }
        .title {
          font-size: 30px;
          color: white;
        }
        .container-login {
          background-color: lightgray;
        }
      `}
    </style>
  </Row>
);

