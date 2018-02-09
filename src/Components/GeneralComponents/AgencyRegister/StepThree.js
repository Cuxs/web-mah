/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import RegisterBar from '../../../stories/RegisterBar';
import style from '../../../Styles/register';

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  render() {
    return (
      <div>
        <RegisterBar onlyLogin />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Creá tu cuenta como Concesionario!</h4>
                  <p>Registrate en muy pocos pasos</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Crear tu cuenta</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step done">
                    <h6>PASO 2</h6>
                    <h4>Contanos sobre tu Concesionario</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step">
                    <h6>PASO 3</h6>
                    <h4>Información del responsable de la Concesionario</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                </div>
                <div className="text-block">
                  <p>Tengo cuenta. <a href="" className="link">Iniciar sesión</a> <br/>
                  Soy un Particular. <a href="" className="link">Registrarme</a></p>
                </div>

              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Información del dueño o responsable del Concesionario </h4>
                <FormGroup>
                  <Label for="exampleEmail">Nombre y Apellido</Label>
                  <Input type="text" name="name" id="exampleEmail" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">DNI</Label>
                  <Input type="numeric" name="dni" id="exampleText" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Domicilio</Label>
                  <Input type="string" name="address" id="exampleEmail" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teléfono</Label>
                  <Input type="numeric" name="phone" id="exampleEmail" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" name="email" id="exampleEmail" />
                </FormGroup>
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.props.history.push('/agencyRegisterS2')}>Volver</Button>
                  <Button color="primary" className="float-right" onClick={() => this.props.history.push('/agencyAdmin')}>Registrarme</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StepThree;