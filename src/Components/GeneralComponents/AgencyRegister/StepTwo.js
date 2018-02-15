/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAgency: parse(this.props.location.search).nameAgency ? parse(this.props.location.search).nameAgency : '',
      addressAgency: '',
      phoneAgency: '',
      emailAgency: '',
    };
  }

  disabled() {
    return !(this.state.email !== '' && this.state.pass !== '' && this.state.repeatPass !== '' && this.state.name !== '' && this.state.phone !== '');
  }

  previous() {
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: parse(search.dataAgency).email,
      pass: parse(search.dataAgency).pass,
      repeatPass: parse(search.dataAgency).repeatPass,
      name: parse(search.dataAgency).name,
      phone: parse(search.dataAgency).phone,
    };
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}}`);
  }

  next() {
    const search = parse(this.props.location.search);

    const dataAgency = {
      email: parse(search.dataAgency).email,
      pass: parse(search.dataAgency).pass,
      repeatPass: parse(search.dataAgency).repeatPass,
      name: parse(search.dataAgency).name,
      phone: parse(search.dataAgency).phone,
      emailAgency: this.state.email,
      phoneAgency: this.state.phone,
      nameAgency: this.state.name,
      addressAgency: this.state.address,
    };
    this.props.history.push(`/agencyRegisterS3?${stringify(dataAgency)}`);
  }

  render() {
    return (
      <div>
        <RegisterBar onlyLogin />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Creá tu cuenta como Concesionario!</h4>
                  <p>Registrate en muy pocos pasos</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Crear tu cuenta</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step">
                    <h6>PASO 2</h6>
                    <h4>Contanos sobre tu Concesionario</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 3</h6>
                    <h4>Información del responsable de la Concesionario</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                </div>
                <div className="text-block">
                  <p>Tengo cuenta. <a href="" className="link">Iniciar sesión</a> <br />
                  Soy un Particular. <a href="" className="link">Registrarme</a>
                  </p>
                </div>

              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Información de la agencia </h4>
                <FormGroup>
                  <Label for="exampleEmail">Nombre de la Agencia</Label>
                  <Input type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Dirección de la Agencia</Label>
                  <Input type="text" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email de la Agencia</Label>
                  <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teléfono de la Agencia</Label>
                  <Input type="numeric" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                </FormGroup>
                <div>
                  <div className="underline" />
                  <Button color="default" className="float-left" onClick={() => this.previous()}>Volver</Button>
                  <Button color="primary" className="float-right" onClick={() => this.next()}>Siguiente</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StepTwo;
