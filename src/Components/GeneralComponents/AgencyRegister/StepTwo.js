/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';
import Input from '../../../stories/Input';


class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAgency: parse(this.props.location.search).nameAgency ? parse(this.props.location.search).nameAgency : '',
      nameAgencyValidate: parse(this.props.location.search).nameAgency,
      addressAgency: parse(this.props.location.search).addressAgency ? parse(this.props.location.search).addressAgency : '',
      addressAgencyValidate: parse(this.props.location.search).addressAgency,
      phoneAgency: parse(this.props.location.search).phoneAgency ? parse(this.props.location.search).phoneAgency : '',
      phoneAgencyValidate: parse(this.props.location.search).phoneAgency,
      emailAgency: parse(this.props.location.search).emailAgency ? parse(this.props.location.search).emailAgency : '',
      emailAgencyValidate: parse(this.props.location.search).emailAgency,
    };
  }

  disabled() {
    return !(this.state.nameAgencyValidate && this.state.addressAgencyValidate && this.state.phoneAgencyValidate && this.state.emailAgencyValidate);
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      pass: search.pass,
      repeatPass: search.repeatPass,
      name: search.name,
      address: search.address,
      phone: search.phone,
    };
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}}`);
  }

  next() {
    if (!(this.state.nameAgencyValidate && this.state.addressAgencyValidate && this.state.phoneAgencyValidate && this.state.emailAgencyValidate)) {
      this._inputName.validate('string');
      this._inputEmail.validate('email');
      this._inputAddress.validate('string');
      this._inputPhone.validate('number');
      return false;
    }

    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      pass: search.pass,
      repeatPass: search.repeatPass,
      name: search.name,
      phone: search.phone,
      address: search.address,
      emailAgency: this.state.emailAgency,
      phoneAgency: this.state.phoneAgency,
      nameAgency: this.state.nameAgency,
      addressAgency: this.state.addressAgency,
    };
    return this.props.history.push(`/agencyRegisterS3?${stringify(dataAgency)}`);
  }

  render() {
    return (
      <div>
        <RegisterBar onlyLogin history={this.props.history} />
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
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className="step">
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
                  <p>Tengo cuenta. <a href="/login" className="link">Iniciar sesión</a> <br />
                  Soy un Particular. <a href="/userRegister" className="link">Registrarme</a>
                  </p>
                </div>

              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Información de la agencia </h4>
                <Input
                  ref={inputName => (this._inputName = inputName)}
                  label="Nombre de la Agencia"
                  type="text"
                  value={this.state.nameAgency}
                  onChange={event => this.setState({ nameAgency: event.target.value })}
                  validate={isValid => this.setState({ nameAgencyValidate: isValid })}
                />
                <Input
                  ref={inputAddress => (this._inputAddress = inputAddress)}
                  label="Dirección de la Agencia"
                  type="alphanumeric"
                  value={this.state.addressAgency}
                  onChange={event => this.setState({ addressAgency: event.target.value })}
                  validate={isValid => this.setState({ addressAgencyValidate: isValid })}
                />
                <Input
                  ref={inputEmail => (this._inputEmail = inputEmail)}
                  label="Email de la Agencia"
                  type="email"
                  value={this.state.emailAgency}
                  onChange={event => this.setState({ emailAgency: event.target.value })}
                  validate={isValid => this.setState({ emailAgencyValidate: isValid })}
                />
                <Input
                  ref={inputPhone => (this._inputPhone = inputPhone)}
                  label="Teléfono de la Agencia"
                  type="number"
                  value={this.state.phoneAgency}
                  onChange={event => this.setState({ phoneAgency: event.target.value })}
                  validate={isValid => this.setState({ phoneAgencyValidate: isValid })}
                />
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                  <Button color="primary" className="float-right" onClick={() => this.next()}>Siguiente</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StepTwo;
