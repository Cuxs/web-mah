/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';

import RegisterBar from '../../../stories/RegisterBar';


class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: parse(this.props.location.search).email ? parse(this.props.location.search).email : '',
      pass: parse(this.props.location.search).pass ? parse(this.props.location.search).pass : '',
      repeatPass: parse(this.props.location.search).repeatPass ? parse(this.props.location.search).repeatPass : '',
    };
  }

  next() {
    const dataUser = {
      email: this.state.email,
      pass: this.state.pass,
      repeatPass: this.state.repeatPass,
    };
    this.props.history.push(`/userRegisterS2?${stringify(dataUser)}`);
  }

  disabled() {
    return !(this.state.email !== '' && this.state.pass !== '' && this.state.repeatPass !== '');
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
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Crear tu cuenta</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 2</h6>
                    <h4>Contanos sobre tu concessionaria</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 3</h6>
                    <h4>Información del responsable de la concessionaria</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12" className="mb-4">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Registrarme</h4>
                <Button color="primary" className="btn-facebook" >
                  <img src="/assets/images/icon-single-facebook.svg" />
                  Registrate con Facebook
                </Button>
                <div className="underline" />

                <h6>O con tu Email</h6>
                <br />

                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Contraseña</Label>
                  <Input type="password" value={this.state.pass} onChange={event => this.setState({ pass: event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Repetir contraseña</Label>
                  <Input type="password" value={this.state.repeatPass} onChange={event => this.setState({ repeatPass: event.target.value })} />
                </FormGroup>
                <div>
                  <div className="underline" />
                  <Button color="primary" disabled={this.disabled()} className="col-6 float-right" onClick={() => this.next()} >Siguiente</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StepOne;
