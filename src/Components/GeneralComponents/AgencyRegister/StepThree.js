/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';
import Input from '../../../stories/Input';
import { registerAgency } from '../../../Modules/fetches';


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
      pass: '',
      passValidate: false,
      modal: '',
      modalTitle: '',
      modalText: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
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

  disabled() {
    return (this.state.nameOwnerValidate && this.state.passValidate && this.state.repeatPassValidate && this.state.addressOwnerValidate && this.state.dniOwnerValidate && this.state.emailOwnerValidate && this.state.phoneOwnerValidate);
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

  submit() {
    if (!(this.state.nameOwnerValidate && this.state.passValidate && this.state.repeatPassValidate && this.state.addressOwnerValidate && this.state.dniOwnerValidate && this.state.emailOwnerValidate && this.state.phoneOwnerValidate)) {
      this._inputName.validate('string');
      this._inputEmail.validate('email');
      this._inputAddress.validate('string');
      this._inputPhone.validate('number');
      this._inputDni.validate('number');
      this._inputPass.validate('password');
      this._inputRepeatPass.validate('passoword');
      return false;
    }

    const search = parse(this.props.location.search);

    const dataAgency = {
      email: search.email,
      password: this.state.pass,
      name: search.name,
      address: search.address,
      phone: search.phone,
      agencyName: search.nameAgency,
      agencyAdress: search.addressAgency,
      agencyEmail: search.emailAgency,
      agencyPhone: search.phoneAgency,
      ownerName: this.state.nameOwner,
      ownerAddress: this.state.addressOwner,
      ownerDni: this.state.dniOwner,
      ownerEmail: this.state.emailOwner,
      ownerPhone: this.state.phoneOwner,
    };
    registerAgency(dataAgency)
      .then((res) => {
        this.setState({
          modalTitle: 'Felicitaciones',
          modalText: res.message,
          modal: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          modalTitle: 'Error',
          modalText: err,
          modal: true,
        });
      });
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
                <h4 className="title-division">Información del dueño o responsable del Concesionario </h4>
                <Input
                  ref={inputName => (this._inputName = inputName)}
                  label="Nombre y Apellido"
                  type="text"
                  value={this.state.nameOwner}
                  onChange={event => this.setState({ nameOwner: event.target.value })}
                  validate={isValid => this.setState({ nameOwnerValidate: isValid })}
                />
                <Input
                  ref={inputDni => (this._inputDni = inputDni)}
                  label="DNI"
                  type="number"
                  value={this.state.dniOwner}
                  onChange={event => this.setState({ dniOwner: event.target.value })}
                  validate={isValid => this.setState({ dniOwnerValidate: isValid })}
                />
                <Input
                  ref={inputAddress => (this._inputAddress = inputAddress)}
                  label="Dirección"
                  type="alphanumeric"
                  value={this.state.addressOwner}
                  onChange={event => this.setState({ addressOwner: event.target.value })}
                  validate={isValid => this.setState({ addressOwnerValidate: isValid })}
                />
                <Input
                  ref={inputEmail => (this._inputEmail = inputEmail)}
                  label="Email"
                  type="email"
                  value={this.state.emailOwner}
                  onChange={event => this.setState({ emailOwner: event.target.value })}
                  validate={isValid => this.setState({ emailOwnerValidate: isValid })}
                />
                <Input
                  ref={inputPhone => (this._inputPhone = inputPhone)}
                  label="Teléfono"
                  type="number"
                  value={this.state.phoneOwner}
                  onChange={event => this.setState({ phoneOwner: event.target.value })}
                  validate={isValid => this.setState({ phoneOwnerValidate: isValid })}
                />
                <div>
                  <div className="underline" />
                  <Input
                    ref={inputPass => (this._inputPass = inputPass)}
                    label="Contraseña"
                    type="password"
                    value={this.state.pass}
                    onChange={event => this.setState({ pass: event.target.value })}
                    validate={isValid => this.setState({ passValidate: isValid })}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <Input
                    ref={inputRepeatPass => (this._inputRepeatPass = inputRepeatPass)}
                    label="Repetir contraseña"
                    type="password"
                    repeatPass
                    value={this.state.repeatPass}
                    currentPass={this.state.pass}
                    onChange={event => this.setState({ repeatPass: event.target.value })}
                    validate={isValid => this.setState({ repeatPassValidate: isValid })}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <div className="underline" />

                  <Button color="default" onClick={() => this.previous()} className="float-left" >Volver</Button>
                  <Button color="primary" className="float-right" onClick={() => this.submit()}>Registrarme</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.modalText}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} href={`${this.state.modalTitle === 'Error' ? '#' : '/userAdmin'}`} >OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default StepThree;
