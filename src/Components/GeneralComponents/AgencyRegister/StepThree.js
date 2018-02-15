/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',

    };
  }

  disabled() {
    return !(this.state.email !== '' && this.state.pass !== '' && this.state.repeatPass !== '' && this.state.name !== '' && this.state.phone !== '');
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataInCharge = {
      email: parse(search.dataAgency).email,
      pass: parse(search.dataAgency).pass,
      repeatPass: parse(search.dataAgency).repeatPass,
      name: parse(search.dataAgency).name,
      phone: parse(search.dataAgency).phone,
      emailAgency: parse(search.dataAgency).email,
      phoneAgency: parse(search.dataAgency).phone,
      nameAgency: parse(search.dataAgency).name,
      addressAgency: parse(search.dataAgency).address,
    };
    this.props.history.push(`/agencyRegisterS1?${stringify(dataInCharge)}}`);
  }

  next() {
    const search = parse(this.props.location.search);

    const dataInCharge = {
      dataInCharge: stringify({
        email: parse(search.dataInCharge).email,
        pass: parse(search.dataInCharge).pass,
        repeatPass: parse(search.dataInCharge).repeatPass,
        name: parse(search.dataInCharge).name,
        phone: parse(search.dataInCharge).phone,
      }),
    };
    const dataAgency = {
      dataAgency: stringify({
        email: this.state.email,
        phone: this.state.phone,
        name: this.state.name,
        address: this.state.address,
      }),
    };
    this.props.history.push(`/agencyRegisterS3?${stringify(dataInCharge)}&${stringify(dataAgency)}`);
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

                  <div className={`step ${this.state.done ? 'done' : ''}`}>
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
                  <Input type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">DNI</Label>
                  <Input type="numeric" value={this.state.dni} onChange={event => this.setState({ dni: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Domicilio</Label>
                  <Input type="text" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teléfono</Label>
                  <Input type="text" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                </FormGroup>
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" >Volver</Button>
                  <Button color="primary" className="float-right" >Registrarme</Button>
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
