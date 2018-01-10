/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import RegisterBar from '../../stories/RegisterBar';
import style from '../../Styles/register';

const StepTwo = ({ data }) => (
  <div>
    <RegisterBar onlyLogin />
    <Row>
      <Col md="6" sm="12">
        <h4>Creá tu cuenta como Particular!</h4>
        <h6>Registrate en muy pocos pasos</h6>

        <h6>PASO 1</h6>
        <h4><b>Crear tu cuenta</b></h4>
        <Button color="link">Modificar datos</Button>

        <div className="underline" />

        <h6>PASO 2</h6>
        <h4><b>Contanos sobre tu concessionaria</b></h4>
        
        <div className="underline" />

        <h6>PASO 3</h6>
        <h4>Información del responsable de la concessionaria</h4>

        <div className="underline" />
      </Col>
      <Col md="4">
        <h4>Información de la agencia </h4>
        <FormGroup>
          <Label for="exampleEmail">Nombre de la Agencia</Label>
          <Input type="text" name="name" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Dirección de la Agencia</Label>
          <Input type="text" name="address" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email de la Agencia</Label>
          <Input type="text" name="email" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Teléfono de la Agencia</Label>
          <Input type="numeric" name="phone" id="exampleEmail" />
        </FormGroup>
        <div>
          <div className="underline" />
          <Button color="secondary" href="/agencyRegisterS1">Volver</Button>
          <Button color="primary" href="/agencyRegisterS3" >Siguiente</Button>
        </div>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default StepTwo;
