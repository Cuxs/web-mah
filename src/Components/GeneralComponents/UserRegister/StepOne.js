/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { stringify, parse } from 'query-string';
import ReactGA from 'react-ga';

import RegisterBar from '../../../stories/RegisterBar';
import Input from '../../../stories/Input';

ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: parse(this.props.location.search).email ? parse(this.props.location.search).email : '',
      emailValidate: parse(this.props.location.search).email,
    };
    ReactGA.pageview('/REGISTRO-USUARIO');
  }

  next() {
    if (!this.state.emailValidate) {
      this._inputEmail.validate('email');
      return false;
    }
    const dataUser = {
      email: this.state.email,
    };
    return this.props.history.push(`/userRegisterS2?${stringify(dataUser)}`);
  }


  render() {
    return (
      <div>
        <RegisterBar onlyLogin history={this.props.history} />
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
                <Input
                  ref={inputEmail => (this._inputEmail = inputEmail)}
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  validate={isValid => this.setState({ emailValidate: isValid })}
                />
                <div>
                  <div className="underline" />
                  <Button color="primary" className="col-6 float-right" onClick={() => this.next()} >Siguiente</Button>
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
