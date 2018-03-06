/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Slider from 'react-rangeslider';

import SearchBar from '../../../stories/SearchBar';
import Input from '../../../stories/Input';
import { thousands } from '../../../Modules/functions';

class PledgeCredits extends React.Component {
  constructor(props, context) {
    super(props, context);
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
      creditReason: '',
      creditReasonValidate: false,
      email: '',
      emailValidate: false,
      phone: '',
      phoneValidate: false,
      messagge: '',
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  handleOnChange(value) {
    this.setState({ volume: value });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  disabled() {
    const {
      nameValidate, dniValidate, addressValidate, ganancyValidate, financyAmountValidate, creditReasonValidate, emailValidate, phoneValidate,
    } = this.state;
    return !(nameValidate && dniValidate && addressValidate && ganancyValidate && financyAmountValidate && creditReasonValidate && emailValidate && phoneValidate);
  }

  requestCredit() {
    const dataRequest = {
      name: this.state.name,
      dni: this.state.dni,
      address: this.state.address,
      ganancy: this.state.ganancy,
      financyAmount: this.state.financyAmount,
      creditReason: this.state.creditReason,
      email: this.state.email,
      phone: this.state.phone,
      messagge: this.state.messagge,
    };
  }

  render() {
    const labels = {
      12: '12', 24: '24', 36: '36', 48: '48', 60: '60',
    };
    const fillStyle = { backgroundColor: '#e70404' };
    return (
      <div>
        <SearchBar history={this.props.history} location={this.props.location} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Llegó el momento de cambiar tu auto!</h4>
                  <p>Con nuestros planes de financiación lo harás de manera más fácil y rápida.</p>
                </div>

                <div className="steps">
                  <div className="step">
                    <h6>¿Como?</h6>
                    <h4>Comprando tu auto en miautohoy.com <b>financiamos tu usado o 0km</b> hasta en un 60% de su valor.</h4>
                  </div>

                  <div className="step">
                    <h6>¿Qué necesitamos?</h6>
                    <h4>Sólo con tu DNI.</h4>
                  </div>
                </div>

                <h6>SIMULÁ TU CUOTA</h6>
                <div className="simulator-container" >
                  <FormGroup>
                    <Label for="exampleEmail">Monto a financiar *</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="De $10.000 a $150.000" />
                  </FormGroup>
                  <Label for="exampleEmail">Cantidad de cuotas</Label>
                  <Slider
                    min={12}
                    max={60}
                    step={12}
                    labels={labels}
                    value={this.state.volume}
                    orientation="horizontal"
                    fillStyle={fillStyle}
                    onChange={value => this.handleOnChange(value)}
                  />
                  <div className="d-flex flex-column align-items-center price-container">
                    <h2><b>$ 1500</b></h2>
                    <h6>TU COUTA</h6>
                  </div>
                </div>

                <small>
                  <h6>Elegí el monto que desees que te financien (*), la cantidad de cuotas (*2), y enterate de cuanto
                    pagarías por mes. (*3,4,5 y 6)
                  </h6>
                  <p className="small-letter">(*) Monto mínimo de $10.000 y máximo de $500.000.</p>
                  <p className="small-letter">(*2) Cuotas mínimas de 6 meses y máximas de 60 meses.</p>
                  <p className="small-letter">(*3) Información valor cuota promedio.</p>
                  <p className="small-letter">(*4) Incluye cuota pura, gastos administrativos e IVA.</p>
                  <p className="small-letter">(*5) No incluye seguro del vehículo.</p>
                  <p className="small-letter">(*6) Corresponde a simulación financiera. El presente cálculo es meramente indicativo, pudiendo
                    variar en función del monto y plazo solicitado. El mismo no implica oferta de crédito ni
                    aceptación de la solicitud de crédito. El efectivo otorgamiento está sujeto está sujeto al análisis
                    que realice la institución de la aptitud crediticia del solicitante. CFTNA máximo: 66%
                  </p>
                </small>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                {this.props.carDetailData &&
                  <div className="d-flex flex-row">
                    <img src="http://placecage.com/c/150/100" alt="banner" />
                    <div className="d-flex flex-column">
                      <h6><b>{`${this.props.carDetailData.Publication.brand} ${this.props.carDetailData.Publication.group} `} </b></h6>
                      <h6>{this.props.carDetailData.Publication.modelName}</h6>
                      <h6>{`${this.props.carDetailData.Publication.year} - ${thousands(this.props.carDetailData.Publication.kms, 0, ',', '.')} km - $${thousands(this.props.carDetailData.Publication.price, 2, ',', '.')}`}</h6>
                    </div>
                  </div>
                }
                <h4 className="title-division">Solicitá tu crédito!</h4>
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
                  label="Destino del crédito"
                  type="string"
                  value={this.state.creditReason}
                  onChange={event => this.setState({ creditReason: event.target.value })}
                  validate={isValid => this.setState({ creditReasonValidate: isValid })}
                />
                <Input
                  label="Email"
                  type="email"
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
                <Button color="primary" className="float-right" disabled={this.disabled()} onClick={() => this.requestCredit()} > Solicitar</Button>
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
      </div>
    );
  }
}

export default PledgeCredits;
