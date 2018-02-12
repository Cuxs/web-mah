/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import SearchBar from '../../../stories/SearchBar';

import style from '../../../Styles/pledgeCredits';

class PersonalShopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dni: '',
      address: '',
      ganancy: '',
      financyAmount: '',
      job: '',
      email: '',
      phone: '',
      messagge: '',
    };
  }

  render() {
    return (
      <div>
        <SearchBar />
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
                    <a className="link">Modificar datos</a>
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
                <FormGroup>
                  <Label for="exampleEmail">Nombre y Apellido</Label>
                  <Input type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} placeholder="Nombre del interesado" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Documento de identidad</Label>
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
                  <Label for="exampleEmail">Ocupación</Label>
                  <Input type="text" value={this.state.job} onChange={event => this.setState({ job: event.target.value })} placeholder="Ocupación del interesado" />
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
                <div className="d-flex justify-content-between align-items-center" >
                  <Button color="default" >Volver</Button>
                  <Button color="primary" >Siguiente</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default PersonalShopper;
