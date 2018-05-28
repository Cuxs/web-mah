/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { stringify, parse } from 'query-string';

import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import { validate } from "../../../Modules/functions";
import {scroller} from 'react-scroll';
import _ from 'lodash';

import RegisterBar from '../../../stories/RegisterBar';
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
    this.register = this.register.bind(this);
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

  register(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
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
        <RegisterBar onlyLogin history={this.props.history} />
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
            <AvForm onSubmit={this.register}>
              <div className="col-md-9 float-left">
                <h4 className="title-division">Los interesados se comunicarán con vos</h4>
                <label>Nombre y Apellido</label>
                <AvField
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate("string")}
                  className="form-control"
                />
                  <label>DNI</label>
                <AvField
                  type="number"
                  value={this.state.dni}
                  onChange={event => this.setState({ dni: event.target.value })}
                  name="dni"
                  id="dni"
                  validate={validate("number")}
                  className="form-control"
                />
                  <label>Dirección</label>
                <AvField
                  type="alphanumeric"
                  value={this.state.address}
                  onChange={event => this.setState({ address: event.target.value })}
                  name="address"
                  id="address"
                  validate={validate("text")}
                  className="form-control"
                />
                  <label>Teléfono</label>
                <AvField
                  type="number"
                  value={this.state.phone}
                  onChange={event => this.setState({ phone: event.target.value })}
                  name="phone"
                  id="phone"
                  validate={validate("number")}
                  className="form-control"
                />
                <div className="underline" />
                <label>Contraseña</label>
                <AvField
                  type={this.state.passwordShow}
                  value={this.state.pass}
                  onChange={event => this.setState({ pass: event.target.value })}
                  name="pass"
                  id="pass"
                  validate={validate("password")}
                  className="form-control"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
                <div style={{ marginBottom: 80 }} >
                  <Button color="link" className="float-right" onClick={() => this.showPass()}>Mostrar</Button>
                </div>
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                  <Button color="primary" className="float-right" type="submit" >Registrarme</Button>
                </div>
              </div>
            </AvForm>
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
