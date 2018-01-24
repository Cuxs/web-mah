/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import RegisterBar from '../../stories/RegisterBar';
import style from '../../Styles/register';

const StepOne = ({ data }) => (
  <div>
    <RegisterBar onlyLogin />
    <Row>
      <Col md="6" sm="12">
        <h4>Creá tu cuenta como Particular!</h4>
        <h6>Registrate en muy pocos pasos</h6>

        <h6>Tengo cuenta. <b>Iniciar sesión</b></h6>
        <h6>Soy un Particular. <b>Registrarme</b></h6>

        <h6>PASO 1</h6>
        <h4><b>Crear tu cuenta</b></h4>
        <Button color="link" >Modificar datos</Button>

        <div className="underline" />

        <h6>PASO 2</h6>
        <h4>Dejá tus datos de contacto para recibir mensajes de los interesados.</h4>
        
        <div className="underline" />

      </Col>
      <Col md="4">
        <h4>Los interesados se comunicarán con vos</h4>
        <FormGroup>
          <Label for="exampleEmail">Nombre y apeellido</Label>
          <Input type="text" name="eil" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name=",AO" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Domicilio</Label>
          <Input type="email" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Teléfono/</Label>
          <Input type="numeric" name="phone" id="exampleText" />
        </FormGroup>

        <div>
          <div className="underline" />
          <Button color="secondary" href="/userRegisterS1" >Volver</Button>
          <Button color="primary" href="/userRegisterS3" >Siguiente</Button>
        </div>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default StepOne;
