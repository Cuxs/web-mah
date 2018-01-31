/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import RegisterBar from '../../stories/RegisterBar';
import style from '../../Styles/register';

const StepOne = ({ data }) => (
  <div>
    <RegisterBar onlyLogin />
    <div className="container-fluid register-steps">
      <Row>
        <Col md="6" sm="12" xs="12" className="bg">
          <div className="col-md-9 float-right">
            <div className="text-block">
              <h4 className="title-division-primary">Creá tu cuenta como Particular!</h4>
              <p>Registrate en muy pocos pasos</p>
            </div>

            <div className="steps">
              <div className="step done">
                <h6>PASO 1</h6>
                <h4>Crear tu cuenta</h4>
                <a className="link">Modificar datos</a>
              </div>

              <div className="step">
                <h6>PASO 2</h6>
                <h4>Contanos sobre tu concessionaria</h4>
                <a className="link">Modificar datos</a>
              </div>

              <div className="step disable">
                <h6>PASO 3</h6>
                <h4>Información del responsable de la concessionaria</h4>
                <a className="link">Modificar datos</a>
              </div>

            </div>

          </div>
        </Col>
        <Col md="6" sm="12" xs="12" className="mb-4">
          <div className="col-md-9 float-left">
            <h4 className="title-division">Los interesados se comunicarán con vos</h4>
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
              <Button color="default" className="col-6 float-left" href="/userRegisterS1" >Volver</Button>
              <Button color="primary" className="col-6 float-right" href="/userRegisterS3" >Siguiente</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default StepOne;
