import React, { Component } from 'react';
import { Button, Label, Input, FormGroup } from 'reactstrap';
import decode from 'jwt-decode';

import parseError from '../Modules/errorParser';
import { login, loginAdmin, recoverPassword } from '../Modules/fetches';
import { saveState } from '../Modules/localStorage';
import NotificationModal from '../stories/NotificationModal';
/* eslint react/jsx-filename-extension: 0 */

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      recoverPassEmail: '',
      forgetPass: false,
      loading: false,
      error: '',
      displayError: false,
      modalTitle: '',
      modalMessage: '',
      showModal: false,
    };
    this.recoverPass = this.recoverPass.bind(this);
    this.disabled = this.disabled.bind(this);
  }
  isLoginFormIncomplete() {
    if (this.state.email === '' || this.state.password === '') {
      return true;
    }
    return false;
  }
  loginUser(email, password) {
    login(email, password)
      .then((response) => {
        const MAHtoken = response.message;
        saveState({ login: { MAHtoken } });
        if (decode(MAHtoken).userType === 'Admin') {
          this.props.history.push('/superAdminPublications');
        } else {
          this.props.history.push('/userAdmin');
        }
      })
      .catch((error) => {
        const errorParsed = parseError(error);
        this.setState({
          email: '',
          password: '',
          modalTitle: errorParsed.title,
          modalMessage: errorParsed.message,
          showModal: true,
        });
      });
  }
  loginAdmin(email, password) {
    loginAdmin(email, password)
      .then((response) => {
        const MAHtoken = response.message;
        saveState({ login: { MAHtoken } });
        if (decode(MAHtoken).userType === 'Admin') {
          this.props.history.push('/superAdminPublications');
        } else {
          this.setState({
            email: '',
            password: '',
            modalTitle: 'Denegado',
            modalMessage: 'Solo usuarios administradores pueden acceder',
            showModal: true,
          });
        }
      })
      .catch((error) => {
        const errorParsed = parseError(error);
        this.setState({
          email: '',
          password: '',
          modalTitle: errorParsed.title,
          modalMessage: errorParsed.message,
          showModal: true,
        });
      });
  }
  recoverPass() {
    this.setState({ loading: true });
    recoverPassword(this.state.recoverPassEmail)
      .then((res) => {
        this.setState({
          loading: false,
          modalTitle: 'Listo',
          modalMessage: res.message,
          showModal: true,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          displayError: true,
          error: error || error.message,
        });
      });
  }
  disabled() {
    if (this.state.recoverPassEmail !== '') {
      return false;
    }
    return true;
  }

  render() {
    const isAdmin =
      this.props.location.state && this.props.location.state === 'isAdmin';
    return (
      <div style={{ top: '20px', position: 'relative' }}>
        <h4
          className="offset-md-3 primary"
          style={{
            font: '300 20px/35px "Lato",sans-serif',
          }}
        >
          {isAdmin
            ? 'Solo administradores pueden acceder'
            : 'Necesitas loguearte para continuar...'}
        </h4>
        <div
          className="col-md-6 offset-md-3"
          style={{ border: 'solid lightgray 1px' }}
        >
          <div className="col-md-6 offset-md-3">
            {!isAdmin && (
              <Button color="primary" className="btn-facebook">
                <img
                  src="/assets/images/icon-single-facebook.svg"
                  alt="facebook"
                />{' '}
                Registrate con facebook
              </Button>
            )}
            <div className="underline" />
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Ej: maria@gmail.com"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Contraseña </Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="******"
              />

              <a
                onClick={() => {
                  this.setState({ forgetPass: true });
                }}
                style={{ cursor: 'pointer' }}
              >
                ¿Olvidaste tu contraseña?
              </a>
              {this.state.forgetPass && (
                <div style={{ paddingTop: '20px' }}>
                  <Label>Ingresa tu email para poder recuperarla </Label>
                  <Input
                    style={{ display: 'inline' }}
                    type="email"
                    value={this.state.recoverPassEmail}
                    onChange={e =>
                      this.setState({ recoverPassEmail: e.target.value })
                    }
                  />
                  {this.state.displayError && <small style={{ color: 'red' }}>{this.state.error}</small>}
                  <Button color="secondary" disabled={this.disabled()} onClick={this.recoverPass} className="alternative" style={{ display: 'inline' }}>Recuperar </Button>
                  {this.state.loading && <img
                    style={{ height: '85px', paddingTop: '10px' }}
                    src="/loading.gif"
                    key={0}
                    alt="Loading..."
                  />}
                </div>
              )}
            </FormGroup>
          </div>
          <div className="row">
            <div className="col-3 float-left offset-3">
              <Button
                disabled={this.isLoginFormIncomplete()}
                onClick={() => {
                  if (isAdmin) {
                    this.loginAdmin(this.state.email, this.state.password);
                  } else {
                    this.loginUser(this.state.email, this.state.password);
                  }
                }}
                color="primary"
                className="alternative"
              >
                Iniciar sesión
              </Button>
            </div>
            <div className="col-3 float-right">
              <Button
                onClick={() => window.location.assign('/')}
                color="default"
                className="alternative"
              >
                Salir
              </Button>
            </div>
            {!isAdmin && (
              <div className="col-md-6 offset-md-3">
                <div className="underline" />
                <p>
                  No tengo cuenta. Soy un particular.{' '}
                  <a href="" className="btn-link">
                    Registrarme
                  </a>
                </p>
                <p>
                  No tengo cuenta. Soy una concesionaria.{' '}
                  <a href="" className="btn-link">
                    Registrar Agencia
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
        <NotificationModal
          primaryText={this.state.modalTitle}
          secondaryText={this.state.modalMessage}
          buttonName="Aceptar"
          showNotificationModal={this.state.showModal}
          handleClose={() => this.setState({ showModal: false })}
        />
      </div>
    );
  }
}
