/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Label, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';
import Input from '../../../stories/Input';


class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOwner: '',
      nameOwnerValidate: false,
      addressOwner: '',
      addressOwnerValidate: false,
      dniOwner: '',
      dniOwnerValidate: false,
      emailOwner: '',
      emailOwnerValidate: false,
      phoneOwner: '',
      phoneOwnerValidate: false,
    };
  }

  disabled() {
    return !(this.state.nameOwnerValidate && this.state.addressOwnerValidate && this.state.dniOwnerValidate && this.state.emailOwnerValidate && this.state.phoneOwnerValidate);
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

  previousS1() {
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
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}}`);
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
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previousS1()} >Modificar datos</Button>
                  </div>

                  <div className="step done">
                    <h6>PASO 2</h6>
                    <h4>Contanos sobre tu Concesionario</h4>
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
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
                <Input
                  label="Nombre y Apellido"
                  type="string"
                  value={this.state.nameOwner}
                  onChange={event => this.setState({ nameOwner: event.target.value })}
                  validate={isValid => this.setState({ nameOwnerValidate: isValid })}
                />
                <Input
                  label="DNI"
                  type="numeric"
                  value={this.state.dniOwner}
                  onChange={event => this.setState({ dniOwner: event.target.value })}
                  validate={isValid => this.setState({ dniOwnerValidate: isValid })}
                />
                <Input
                  label="Dirección"
                  type="alphanumeric"
                  value={this.state.addressOwner}
                  onChange={event => this.setState({ addressOwner: event.target.value })}
                  validate={isValid => this.setState({ addressOwnerValidate: isValid })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={this.state.emailOwner}
                  onChange={event => this.setState({ emailOwner: event.target.value })}
                  validate={isValid => this.setState({ emailOwnerValidate: isValid })}
                />
                <Input
                  label="Teléfono"
                  type="numeric"
                  value={this.state.phoneOwner}
                  onChange={event => this.setState({ phoneOwner: event.target.value })}
                  validate={isValid => this.setState({ phoneOwnerValidate: isValid })}
                />
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
