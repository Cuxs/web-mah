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
      nameOwner: '',
      addressOwner: '',
      dniOwner: '',
      emailOwner: '',
      phoneOwner: '',
    };
  }

  disabled() {
    return !(this.state.email !== '' && this.state.pass !== '' && this.state.repeatPass !== '' && this.state.name !== '' && this.state.phone !== '');
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      pass: search.pass,
      repeatPass: search.repeatPass,
      name: search.name,
      phone: search.phone,
      emailAgency: search.emailAgency,
      phoneAgency: search.phoneAgency,
      nameAgency: search.nameAgency,
      addressAgency: search.addressAgency,
    };
    this.props.history.push(`/agencyRegisterS2?${stringify(dataAgency)}}`);
  }

  next() {
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      password: search.pass,
      name: search.name,
      phone: search.phone,
      address: search.address,
      agencyEmail: search.emailAgency,
      agencyPhone: search.phoneAgency,
      agencyName: search.nameAgency,
      agencyAdress: search.addressAgency,
      ownerName: this.state.nameOwner,
      ownerAddress: this.state.addressOwner,
      ownerDni: this.state.dniOwner,
      ownerEmail: this.state.emailOwner,
      ownerPhone: this.state.phoneOwner,
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

                  <div className={`step ${this.disabled() ? 'done' : ''}`}>
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
                  <Input type="text" value={this.state.nameOwner} onChange={event => this.setState({ nameOwner: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">DNI</Label>
                  <Input type="numeric" value={this.state.dniOwner} onChange={event => this.setState({ dniOwner: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Domicilio</Label>
                  <Input type="text" value={this.state.addressOwner} onChange={event => this.setState({ addressOwner: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teléfono</Label>
                  <Input type="text" value={this.state.phoneOwner} onChange={event => this.setState({ phoneOwner: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" value={this.state.emailOwner} onChange={event => this.setState({ emailOwner: event.target.value })} />
                </FormGroup>
                <div>
                  <div className="underline" />
                  <Button color="default" onClick={() => this.previous()} className="float-left" >Volver</Button>
                  <Button color="primary" disabled={this.disabled()} className="float-right" >Registrarme</Button>
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
