import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Row>
    <div className="col-md-12" >
      <img src="http://placecage.com/c/1440/330" alt="banner" />
      <div className="container-banner" >
        <h3 className="title">
          Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!
        </h3>
        <Col md="3" sm="10" className="container-login" >
          <h5>¡Registrate gratis!</h5>
          <Button color="primary" >Registrate con Facebook</Button>
          <h6>o con tu email</h6>
          <FormGroup>
            <Input type="email" name="email" placeholder="Email" />
          </FormGroup>
          <Button color="primary" href="/userRegisterS1" >Comenzar</Button>
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

