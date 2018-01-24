/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import RegisterBar from '../../stories/RegisterBar';
import style from '../../Styles/register';

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
            <Button color="link">Modificar datos</Button>

            <div className="underline" />

            <h6>PASO 3</h6>
            <h4><b>Información del responsable de la concessionaria</b></h4>

            <div className="underline" />
          </Col>
          <Col md="4">
            <h4>Información del dueño o responsable de la concessionaria </h4>
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
              <Button color="secondary" onClick={() => this.props.history.push('/agencyRegisterS2')}>Volver</Button>
              <Button color="primary" onClick={() => this.props.history.push('/agencyAdmin')}>Registrarme</Button>
            </div>
          </Col>
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default StepThree;
