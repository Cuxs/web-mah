/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';
import Input from '../../../stories/Input';

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
    };
  }

  disabled() {
    return !(this.state.nameValidate && this.state.phoneValidate && this.state.addressValidate && this.state.dniValidate);
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataUser = {
      email: search.email,
      pass: search.pass,
    };
    this.props.history.push(`/userRegisterS1?${stringify(dataUser)}}`);
  }

  register() {
    const search = parse(this.props.location.search);

    const dataUser = {
      email: search.email,
      pass: search.pass,
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      dni: this.state.dni,
    };
    console.log(dataUser)
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

                  <div className={`step ${this.disabled() ? 'done' : ''}`}>
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                </div>

              </div>
            </Col>
            <Col md="6" sm="12" xs="12" className="mb-4">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Los interesados se comunicarán con vos</h4>
                <Input
                  label="Nombre y Apellido"
                  type="string"
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

                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                  <Button color="primary" disabled={this.disabled()} className="float-right" onClick={() => this.register()}>Registrarme</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
              Tu cuenta ha sido creada con éxito.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" href="/userAdmin" >OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default StepTwo;
