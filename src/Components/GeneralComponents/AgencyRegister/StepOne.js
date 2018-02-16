/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';
import style from '../../../Styles/register';

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: parse(this.props.location.search).email ? parse(this.props.location.search).email : '',
      pass: parse(this.props.location.search).pass ? parse(this.props.location.search).pass : '',
      repeatPass: parse(this.props.location.search).repeatPass ? parse(this.props.location.search).repeatPass : '',
      name: parse(this.props.location.search).name ? parse(this.props.location.search).name : '',
      address: parse(this.props.location.search).address ? parse(this.props.location.search).name : '',
      phone: parse(this.props.location.search).phone ? parse(this.props.location.search).phone : '',
    };
  }

  next() {
    const dataAgency = {
      email: this.state.email,
      pass: this.state.pass,
      repeatPass: this.state.repeatPass,
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      nameAgency: parse(this.props.location.search).nameAgency ? parse(this.props.location.search).nameAgency : '',
    };
    this.props.history.push(`/agencyRegisterS2?${stringify(dataAgency)}`);
  }

  disabled() {
    return !(this.state.email !== '' && this.state.pass !== '' && this.state.repeatPass !== '' && this.state.name !== '' && this.state.phone !== '' && this.state.name !== '');
  }


  render() {
    return (
      <div>
        <RegisterBar onlyLogin history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-9 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Creá tu cuenta como Concesionario!</h4>
                  <p>Registrate en muy pocos pasos</p>
                </div>

                <div className="steps">
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Crear tu cuenta</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 2</h6>
                    <h4>Contanos sobre tu Concesionario</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 3</h6>
                    <h4>Información del responsable de la Concesionario</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                </div>
                <div className="text-block">
                  <p>Tengo cuenta. <a href="" className="link">Iniciar sesión</a> <br />
                  Soy un Particular. <a href="" className="link">Registrarme</a>
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Registrarme</h4>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Contraseña</Label>
                  <Input type="password" value={this.state.pass} onChange={event => this.setState({ pass: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Repetir contraseña</Label>
                  <Input type="password" value={this.state.repeatPass} onChange={event => this.setState({ repeatPass: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Nombre del Encargado</Label>
                  <Input type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Domicilio del Encargado</Label>
                  <Input type="text" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teléfono</Label>
                  <Input type="numeric" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                </FormGroup>
                <div>
                  <div className="underline" />
                  <Button color="primary" disabled={this.disabled()} className="float-right" onClick={() => this.next()} >Siguiente</Button>
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
