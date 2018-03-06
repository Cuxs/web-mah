/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';
import Input from '../../../stories/Input';
import { registerUser } from '../../../Modules/fetches';

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: parse(this.props.location.search).name ? parse(this.props.location.search).name : '',
      nameValidate: parse(this.props.location.search).name,
      phone: parse(this.props.location.search).phone ? parse(this.props.location.search).phone : '',
      phoneValidate: parse(this.props.location.search).phone,
      address: parse(this.props.location.search).address ? parse(this.props.location.search).address : '',
      addressValidate: parse(this.props.location.search).address,
      dni: parse(this.props.location.search).dni ? parse(this.props.location.search).dni : '',
      dniValidate: parse(this.props.location.search).dni,
      pass: parse(this.props.location.search).pass ? parse(this.props.location.search).pass : '',
      passValidate: parse(this.props.location.search).email,
      repeatPass: parse(this.props.location.search).repeatPass ? parse(this.props.location.search).repeatPass : '',
      repeatPassValidate: parse(this.props.location.search).email,
      modal: false,
      modalTitle: '',
      modalText: '',
      passwordShow: 'password',
    };
    this.toggle = this.toggle.bind(this);
  }

  disabled() {
    return !(this.state.nameValidate && this.state.phoneValidate && this.state.addressValidate && this.state.dniValidate && this.state.passValidate && this.state.repeatPassValidate);
  }
  previous() {
    const search = parse(this.props.location.search);
    const dataUser = {
      email: search.email,
    };
    this.props.history.push(`/userRegisterS1?${stringify(dataUser)}`);
  }

  showPass() {
    this.setState({ passwordShow: 'text' });
    setTimeout(() => this.setState({ passwordShow: 'password' }), 4000);
  }

  register() {
    const search = parse(this.props.location.search);

    const dataUser = {
      email: search.email,
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      dni: this.state.dni,
      password: this.state.pass,
    };
    registerUser(dataUser)
      .then((res) => {
        this.setState({
          modalTitle: 'Felicitaciones',
          modalText: res.message,
          modal: true,
        });
      })
      .catch((err) => {
        this.setState({
          modalTitle: 'Error',
          modalText: err,
          modal: true,
        });
      });
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }
  render() {
    return (
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
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className={`step ${!this.disabled() ? 'done' : ''}`}>
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                  </div>

                </div>

              </div>
            </Col>
            <Col md="6" sm="12" xs="12" className="mb-4">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Los interesados se comunicarán con vos</h4>
                <Input
                  label="Nombre y Apellido"
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  validate={isValid => this.setState({ nameValidate: isValid })}
                />
                <Input
                  label="DNI"
                  type="numeric"
                  value={this.state.dni}
                  onChange={event => this.setState({ dni: event.target.value })}
                  validate={isValid => this.setState({ dniValidate: isValid })}
                />
                <Input
                  label="Dirección"
                  type="alphanumeric"
                  value={this.state.address}
                  onChange={event => this.setState({ address: event.target.value })}
                  validate={isValid => this.setState({ addressValidate: isValid })}
                />
                <Input
                  label="Teléfono"
                  type="numeric"
                  value={this.state.phone}
                  onChange={event => this.setState({ phone: event.target.value })}
                  validate={isValid => this.setState({ phoneValidate: isValid })}
                />
                <div className="underline" />
                <Input
                  label="Contraseña"
                  type={this.state.passwordShow}
                  value={this.state.pass}
                  onChange={event => this.setState({ pass: event.target.value })}
                  validate={isValid => this.setState({ passValidate: isValid })}
                  placeholder="Mínimo 6 caracteres"
                />
                <div style={{ marginBottom: 80 }} >
                  <Button color="link" className="float-right" onClick={() => this.showPass()}>Mostrar</Button>
                </div>
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                  <Button color="primary" className="float-right" onClick={() => this.register()}>Registrarme</Button>
                </div>
              </div>
            </Col>
          </Row>
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
      </div>
    );
  }
}

export default StepTwo;
