/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import RegisterBar from '../../stories/RegisterBar';
import style from '../../Styles/register';

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  render() {
    return (
      <div>
        <RegisterBar onlyLogin history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" className="bg">
              <div class="col-md-8 float-right">
                <div class="text-block">
                  <h4 className="title-division-primary">Creá tu cuenta como Particular!</h4>
                  <p>Registrate en muy pocos pasos</p>
                </div>
                <div class="text-block">
                  <p>Tengo cuenta. <a href="" className="link">Iniciar sesión</a> <br/>
                  Soy un Particular. <a href="" className="link">Registrarme</a></p>
                </div>

                <div className="steps">
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Crear tu cuenta</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
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
            <Col md="6">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Registrarme</h4>
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
                  <Button color="default" className="col-6 float-left" onClick={() => this.props.history.push('/agencyRegisterS1')} >Volver</Button>
                  <Button color="primary" className="col-6 float-right" onClick={() => this.props.history.push('/agencyRegisterS2')} >Siguiente</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StepOne;
