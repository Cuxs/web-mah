/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import SearchBar from '../../../stories/SearchBar';

import style from '../../../Styles/pledgeCredits';


class FreeDestinationCredits extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div>
        <SearchBar history={this.props.history} location={this.props.location} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">No hace falta que vendas tu auto!</h4>
                  <p>Usalo de garantía, solicitá un préstamo y usa el dinero para lo que vos quieras.</p>
                </div>
    
                <div className="steps">
                  <div className="step">
                    <h6>¿Como?</h6>
                    <h4>Completa los datos a continuación y un asesor se pondrá en contacto con vos a la brevedad.</h4>
                  </div>
    
                  <div className="step">
                    <h6>¿Qué necesitamos?</h6>
                    <h4>Sólo con tu DNI.</h4>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
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
                <Button color="primary">Solicitar</Button>
              </div>
            </Col>
          </Row>
        </div>
        <style jsx>{style}</style>
      </div>

    );
  }
}

export default FreeDestinationCredits;
