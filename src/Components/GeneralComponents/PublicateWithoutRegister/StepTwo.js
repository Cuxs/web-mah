/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Label, FormGroup, Input } from 'reactstrap';
import { parse, stringify } from 'query-string';

import AdminBar from '../../../stories/AdminBar';


class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    const search = parse(this.props.location.search);
    this.state = {
      name: search.DataPerson ? parse(search.DataPerson).name : '',
      phone: search.DataPerson ? parse(search.DataPerson).phone : '',
      email: search.DataPerson ? parse(search.DataPerson).email : '',
    };
  }

  previous() {
    const search = parse(this.props.location.search);
    const dataCar = {
      DataCar: search.DataCar,
    };
    const dataExtras = {
      Caracteristics: search.Caracteristics,
      TecnicalData: search.TecnicalData,
      Additionals: search.Additionals,
    };
    const dataPerson = search.DataPerson ? { DataPerson: search.DataPerson } : {
      DataPerson: stringify({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
      }),
    };
    this.props.history.push(`/publicateWithoutRegisterS1?${stringify(dataCar)}&${stringify(dataExtras)}&${stringify(dataPerson)}`);
  }

  next() {
    const search = parse(this.props.location.search);
    const dataCar = {
      DataCar: stringify(parse(search.DataCar)),
    };
    const dataExtras = {
      Caracteristics: search.Caracteristics,
      TecnicalData: search.TecnicalData,
      Additionals: search.Additionals,
    };
    const dataPerson = {
      DataPerson: stringify({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
      }),
    };
    this.props.history.push(`/publicateWithoutRegisterS3?${stringify(dataCar)}&${stringify(dataPerson)}&${stringify(dataExtras)}`);
  }

  disabled() {
    return !(this.state.email !== '' && this.state.name !== '' && this.state.phone !== '');
  }

  render() {
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg pb-4">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Vendé tu auto ya!</h4>
                  <p>En muy simples pasos podés publicar tu auto.</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Contanos de tu auto</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step">
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step">
                    <h6>PASO 3</h6>
                    <h4>Mostralo con fotos</h4>
                    <p className="info">* Mínimo 3 fotos</p>
                  </div>
                </div>

                <div className="text-block">
                  <ul>
                    <li>Publicaciones gratis ilimitadas</li>
                    <li>Tiempo de publicación: 60 días</li>
                    <li>Posibilidad de compra garantizada si transcurridos los 60 días no vendió su auto</li>
                    <li>Panel de Control de autos publicados</li>
                    <li>Chat con los interesados</li>
                    <li>Anuncios destacados ilimitados</li>
                    <li>Publicaciones en redes sociales</li>
                  </ul>
                </div>
                <div className="text-block">
                  <h4 className="title-division-primary">Para obtener más beneficios, Registrate!</h4>
                  <Button color="primary btn-facebook">Registrate con facebook</Button>
                  <div className="underline" />
                  <p>O con tu email</p>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleText" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Contraseña</Label>
                    <Input type="password" name="password" id="exampleText" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Repetir Contraseña</Label>
                    <Input type="password" name="password" id="exampleText" />
                  </FormGroup>
                  <Button color="primary" className="float-right">Registrarme</Button>
                </div>
              </div>

            </Col>
            <Col md="6" sm="12" xs="12" className="mb-4">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Solicitá tu crédito!</h4>
                <FormGroup>
                  <Label for="exampleEmail">Nombre y Apellido</Label>
                  <Input type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teléfono</Label>
                  <Input type="numeric" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                </FormGroup>
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()} >Volver</Button>
                  <Button color="primary" disabled={this.disabled()} className="float-right" onClick={() => this.next()} >Siguiente</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default CreatePublication;