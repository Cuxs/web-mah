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

        <div className="underline" />

        <h6>PASO 2</h6>
        <h4>Contanos sobre tu concessionaria</h4>
        
        <div className="underline" />

        <h6>PASO 3</h6>
        <h4>Información del responsable de la concessionaria</h4>

        <div className="underline" />
      </Col>
      <Col md="4">
        <h4>Registrarme</h4>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Contraseña</Label>
          <Input type="password" name="password" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Repetir contraseña</Label>
          <Input type="password" name="repeatPassword" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Nombre del Administrador</Label>
          <Input type="text" name="name" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Teléfono</Label>
          <Input type="numeric" name="phone" id="exampleEmail" />
        </FormGroup>
        <div>
          <div className="underline" />
          <Button color="primary" href="/agencyRegisterS2" >Siguiente</Button>
        </div>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default StepOne;
