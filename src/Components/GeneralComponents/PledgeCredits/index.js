/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import Slider from 'react-rangeslider';

import SearchBar from '../../../stories/SearchBar';
import { thousands } from '../../../Modules/functions';

class PledgeCredits extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      dni: '',
      address: '',
      ganancy: '',
      financyAmount: '',
      creditReason: '',
      email: '',
      phone: '',
      messagge: '',
    };
  }

  handleOnChange(value) {
    this.setState({ volume: value });
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
                <FormGroup>
                  <Label for="exampleEmail">Nombre y Apellido</Label>
                  <Input type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} placeholder="Nombre del interesado" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Documento de Identidad</Label>
                  <Input type="text" value={this.state.dni} onChange={event => this.setState({ dni: event.target.value })} placeholder="Número de documento" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Domicilio</Label>
                  <Input type="text" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} placeholder="Domicilio del interesado" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Ingresos</Label>
                  <Input type="numeric" value={this.state.ganancy} onChange={event => this.setState({ ganancy: event.target.value })} placeholder="Ingrese un número sin puntos ni comas" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Monto a financiar</Label>
                  <Input type="numeric" value={this.state.financyAmount} onChange={event => this.setState({ financyAmount: event.target.value })} placeholder="Ingrese un número sin puntos ni comas" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Destino del crédito</Label>
                  <Input type="text" value={this.state.creditReason} onChange={event => this.setState({ creditReason: event.target.value })} placeholder="Razón del crédito" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} placeholder="Correo electrónico" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teléfono</Label>
                  <Input type="numeric" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} placeholder="Teléfono del intersado" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Mensaje</Label>
                  <Input type="textarea" value={this.state.messagge} onChange={event => this.setState({ messagge: event.target.value })} />
                </FormGroup>
                <Button color="primary"> Solicitá</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default PledgeCredits;
