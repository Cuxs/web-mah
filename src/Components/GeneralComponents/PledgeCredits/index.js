/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import Slider from 'react-rangeslider';

import SearchBar from '../../../stories/SearchBar';
import { thousands } from '../../../Modules/functions';

import style from '../../../Styles/pledgeCredits';

class PledgeCredits extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 0,
    };
  }

  handleOnChange(value) {
    this.setState({ volume: value });
  }

  render() {
    const labels = {
      12: '12', 24: '24', 36: '36', 48: '48', 60: '60',
    };
    return (
      <div>
        <SearchBar history={this.props.history} location={this.props.location} />
        <Row>
          <Col md="6" sm="12" className="container-section">
            <h4>Llegó el momento de cambiar tu auto!</h4>
            <h6>Con nuestros planes de financiación lo harás de manera más fácil y rápida.</h6>

            <h4>Como?</h4>
            <h6>Comprando tu auto en miautohoy.com <b>financiamos tu usado o 0km hasta en un 60% de su valor.</b></h6>

            <h4>Qué necesitamos?</h4>
            <h6>Sólo con tu DNI.</h6>

            <h4>SIMULÁ TU CUOTA</h4>
            <div className="simulator-container" >
              <h6>Monto a financiar * <button><span className="fa fa-question-circle" /></button></h6>
              <FormGroup>
                <Input type="email" name="email" id="exampleEmail" placeholder="De $10.000 a $150.000" />
              </FormGroup>
              <h6>Cantidad de cuotas</h6>
              <Slider
                min={12}
                max={60}
                step={12}
                labels={labels}
                value={this.state.volume}
                orientation="horizontal"
                onChange={value => this.handleOnChange(value)}
              />
              <h5>$ 1500</h5>
              <h6>TU COUTA</h6>
            </div>
            <h4>IMPORTANTE</h4>
            <h5>Elegí el monto que desees que te financien (*), la cantidad de cuotas (*2), y enterate de cuanto
              pagarías por mes. (*3,4,5 y 6)
            </h5>
            <p>(*) Monto mínimo de $10.000 y máximo de $500.000.</p>
            <p>(*2) Cuotas mínimas de 6 meses y máximas de 60 meses.</p>
            <p>(*3) Información valor cuota promedio.</p>
            <p>(*4) Incluye cuota pura, gastos administrativos e IVA.</p>
            <p>(*5) No incluye seguro del vehículo.</p>
            <p>(*6) Corresponde a simulación financiera. El presente cálculo es meramente indicativo, pudiendo
              variar en función del monto y plazo solicitado. El mismo no implica oferta de crédito ni
              aceptación de la solicitud de crédito. El efectivo otorgamiento está sujeto está sujeto al análisis
              que realice la institución de la aptitud crediticia del solicitante. CFTNA máximo: 66%
            </p>

          </Col>
          <Col md="4">
            {
              this.props.carDetailData &&
              <div className="d-flex flex-row">
                <img src="http://placecage.com/c/150/100" alt="banner" />
                <div className="d-flex flex-column">
                  <h6><b>{`${this.props.carDetailData.Publication.brand} ${this.props.carDetailData.Publication.group} `} </b></h6>
                  <h6>{this.props.carDetailData.Publication.modelName}</h6>
                  <h6>{`${this.props.carDetailData.Publication.year} - ${thousands(this.props.carDetailData.Publication.kms, 0, ',', '.')} km - $${thousands(this.props.carDetailData.Publication.price, 2, ',', '.')}`}</h6>
                </div>
              </div>
            }
            <h4>Solicitá tu crédito!</h4>
            <FormGroup>
              <Label for="exampleEmail">Nombre y Apellido</Label>
              <Input type="string" name="name" id="exampleEmail" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">DNI</Label>
              <Input type="numeric" name="dni" id="exampleEmail" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Domicilio</Label>
              <Input type="string" name="address" id="exampleEmail" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Ingresos</Label>
              <Input type="numeric" name="dni" id="exampleEmail" placeholder="Ingrese un número sin puntos ni comas" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Monto a financiar</Label>
              <Input type="numeric" name="dni" id="exampleEmail" placeholder="Ingrese un número sin puntos ni comas" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Ocupación</Label>
              <Input type="string" name="job" id="exampleEmail" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Teléfono</Label>
              <Input type="numeric" name="phone" id="exampleEmail" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Mensaje</Label>
              <Input type="textarea" name="text" id="exampleText" placeholder="Ingresa tu consulta" />
            </FormGroup>
            <Button color="primary"> Solicitá</Button>
          </Col>
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default PledgeCredits;
