/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { stringify, parse } from 'query-string';

import SearchBar from '../../../stories/SearchBar';
import Input from '../../../stories/Input';

import style from '../../../Styles/pledgeCredits';

class PersonalShopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValidate: false,
      dni: '',
      dniValidate: false,
      address: '',
      addressValidate: false,
      ganancy: '',
      ganancyValidate: false,
      financyAmount: '',
      financyAmountValidate: false,
      job: '',
      jobValidate: false,
      email: '',
      emailValidate: false,
      phone: '',
      phoneValidate: false,
      messagge: '',
    };
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataShopper = {
      kms: search.kms,
      year: search.year,
      price: search.price,
      brand: search.brand,
      group: search.group,
      codia: search.codia,
      observation: search.observation
    };
    this.props.history.push(`/personalShopperS1?${stringify(dataShopper)}}`);
  }

  register() {
    const search = parse(this.props.location.search);

    const dataUser = {
      kms: search.kms,
      year: search.year,
      price: search.price,
      brand: search.brand,
      group: search.group,
      codia: search.codia,
      observation: search.observation,
      name: this.state.name,
      dni: this.state.dni,
      address: this.state.address,
      ganancy: this.state.ganancy,
      financyAmount: this.state.address,
      job: this.state.job,
      email: this.state.email,
      phone: this.state.phone,
    };
    console.log(dataUser)
  }

  disabled() {
    const {
      nameValidate, dniValidate, addressValidate, ganancyValidate, financyAmountValidate, jobValidate, emailValidate, phoneValidate,
    } = this.state;
    return !(nameValidate && dniValidate && addressValidate && ganancyValidate && financyAmountValidate && jobValidate && emailValidate && phoneValidate);
  }

  render() {
    return (
      <div>
        <SearchBar history={this.props.history} location={this.props.location} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">¿Cansado de buscar?</h4>
                  <p>En simples pasos contanos lo que buscás y nosotros lo buscamos por vos.</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Contanos lo que buscás</h4>
                    <Button className="btn btn-link-primary" style={{ paddingLeft: 0 }} onClick={() => this.previous()} >Modificar datos</Button>
                  </div>

                  <div className="step">
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Datos del interesado</h4>
                <Input
                  label="Nombre y Apellido"
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  validate={isValid => this.setState({ nameValidate: isValid })}
                />
                <Input
                  label="Documento de Identidad"
                  type="number"
                  value={this.state.dni}
                  onChange={event => this.setState({ dni: event.target.value })}
                  validate={isValid => this.setState({ dniValidate: isValid })}
                />
                <Input
                  label="Domicilio"
                  type="alphanumeric"
                  value={this.state.address}
                  onChange={event => this.setState({ address: event.target.value })}
                  validate={isValid => this.setState({ addressValidate: isValid })}
                />
                <Input
                  label="Ingresos"
                  type="number"
                  value={this.state.ganancy}
                  onChange={event => this.setState({ ganancy: event.target.value })}
                  validate={isValid => this.setState({ ganancyValidate: isValid })}
                />
                <Input
                  label="Monto a financiar"
                  type="number"
                  value={this.state.financyAmount}
                  onChange={event => this.setState({ financyAmount: event.target.value })}
                  validate={isValid => this.setState({ financyAmountValidate: isValid })}
                />
                <Input
                  label="Ocupación"
                  type="text"
                  value={this.state.job}
                  onChange={event => this.setState({ job: event.target.value })}
                  validate={isValid => this.setState({ jobValidate: isValid })}
                />
                <Input
                  label="Email"
                  type="text"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  validate={isValid => this.setState({ emailValidate: isValid })}
                />
                <Input
                  label="Teléfono"
                  type="number"
                  value={this.state.phone}
                  onChange={event => this.setState({ phone: event.target.value })}
                  validate={isValid => this.setState({ phoneValidate: isValid })}
                />
                <Input
                  label="Mensaje"
                  type="textarea"
                  value={this.state.messagge}
                  onChange={event => this.setState({ messagge: event.target.value })}
                  validate={isValid => this.setState({ messaggeValidate: isValid })}
                />
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                  <Button color="primary" disabled={this.disabled()} className="float-right" onClick={() => this.register()}>Registrarme</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggleModal}>¡Felicitaciones!</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">Tu consulta ha sido enviado correctamente. Nos contactaremos a la brevedad para brindarte toda la información necesaria.</div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.props.history.push('/')} >OK</Button>
            </ModalFooter>
          </Modal>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default PersonalShopper;
