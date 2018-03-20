import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {
  Col,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
} from 'reactstrap';
import { Notification } from 'react-notification';
import FacebookLogin from 'react-facebook-login';

import _ from 'lodash';
import style from '../Styles/search';
import autocompleteStyles from '../Styles/autocompleteInput';
import {
  getSuggestions,
  getSuggestionValue,
  renderSectionTitle,
  renderSuggestion,
  getSectionSuggestions,
} from '../Modules/autocompleteData';
import {
  isUserLogged,
  getUserDataFromToken,
  clearSession,
  isAdminLogged,
} from '../Modules/sessionFunctions';
import Input from './Input';
import NotificationModal from '../stories/NotificationModal';
import parseError from '../Modules/errorParser';
import { login, recoverPassword } from '../Modules/fetches';
import { saveState } from '../Modules/localStorage';
/* eslint react/jsx-filename-extension: 0 */

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.togglePublicate = this.togglePublicate.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
    this.state = {
      suggestions: [],
      dropdownOpen: false,
      dropdownUser: false,
      dropdownOpenPublicate: false,
      modal: false,
      sidebar: '',
      email: '',
      emailValidate: false,
      password: '',
      passwordValidate: false,
      showModal: false,
      modalTitle: '',
      modalMessage: '',
      isNotificationActive: false,
      isUserLogged: isUserLogged(),
      carState:
        this.props.carState === undefined ? 'Usado' : this.props.carState,
      value: this.props.text === undefined ? '' : this.props.text,
      recoverPassEmail: '',
      forgetPass: false,
      loading: false,
      error: '',
      displayError: false,
    };
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.recoverPass = this.recoverPass.bind(this);
    this.disabled = this.disabled.bind(this);
    this.loginFB = this.loginFB.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '146328269397173',
        cookie: true,
        xfbml: true,
        version: 'v2.1',
      });
      this.checkLoginState()
    }.bind(this);
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue,
    });
  }
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }
  isLoginFormIncomplete() {
    return !(this.state.emailValidate && this.state.passwordValidate);
  }
  submitSearch() {
    this.setState({ sidebar: '' });
    this.props.history.push(`/SearchCars?text=${this.state.value}&carState=${
      this.state.carState
    }`);
  }

  checkLoginState() {
    window.FB.getLoginStatus((response) => {
      console.log(response);
      // Aca hay q verificar si esta registrado en nuestro sistema
      // si esta sigue con statusChangeCallback
      this.statusChangeCallback(response);
      // sino hay q cambiar el status response.status = "not_authorized" y llamar a statusChangeCallback
    });
  }

  loginFB() {
    window.FB.api('/me', { fields: ['email', 'name'] }, (response) => {
      console.log(response);
      console.log(`Successful login for: ${response.name}`);
      this.setState({
        isNotificationActive: true,
        nameFB: response.name,
        isUserLogged: true,
      });
    });
  }
  statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logueado en Face, pero no se sabe si esta registrado o no en nuestra db
      // Si esta this.loginFB();
      this.loginFB();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      // Registrarlo con los datos que hay en response
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      // Se tiene que loguear con face
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  togglePublicate() {
    this.setState({
      dropdownOpenPublicate: !this.state.dropdownOpenPublicate,
    });
  }
  toggleUser() {
    this.setState({
      dropdownUser: !this.state.dropdownUser,
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleNotification() {
    this.setState({
      isNotificationActive: !this.state.isNotificationActive,
    });
  }
  loginUser(email, password) {
    login(email, password)
      .then((response) => {
        const MAHtoken = response.message;
        saveState({ login: { MAHtoken } });
        this.toggleModal();
        this.setState({
          isNotificationActive: true,
          email: '',
          password: '',
          isUserLogged: true,
        });
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

  clearSession() {
    window.FB.logout();
    clearSession();
    this.setState({ isUserLogged: false });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '¿Que estás buscando?',
      value,
      onChange: this.onChange,
    };
    return (
      <div className="container-fluid">
        <Row className="header">
          <Col md="2">
            <Row>
              <a onClick={() => this.props.history.push('/')} className="brand">
                <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
              </a>
            </Row>
          </Col>
          <Col md="10" className="d-xl-none">
            <Button color="primary" onClick={() => this.setState({ sidebar: 'active' })} className="float-right btn-sidebar-open btn-link-primary">
              <img src="/assets/images/icon-menu.svg" alt="" />
            </Button>
          </Col>
          <Col md="10" className={`sidebar-mobile d-none d-xl-block ${this.state.sidebar}`}>
            <Button color="primary" onClick={() => this.setState({ sidebar: '' })} className="btn-link-primary btn-sidebar-close d-none">
              <img src="/assets/images/icon-close.svg" alt="" />
            </Button>
            <Row className="align-items-center area-btns justify-content-start">
              <Col lg="3" xs="12" sm="12">
                {/* <Input type="text" id="search" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }); }} /> */}
                <Row>
                  <Autosuggest
                    multiSection
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    renderSectionTitle={renderSectionTitle}
                    getSectionSuggestions={getSectionSuggestions}
                    inputProps={inputProps}
                  />
                  <style jsx>{autocompleteStyles}</style>
                </Row>
              </Col>
              <Col lg="1" sm="10" xs="10">
                <Row>
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle caret color="default" className="btn-select">{this.state.carState}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        value="Nuevo"
                        onClick={e => this.setState({ carState: e.target.value })}
                      >
                        Nuevo
                      </DropdownItem>
                      <DropdownItem
                        value="Usado"
                        onClick={e => this.setState({ carState: e.target.value })}
                      >
                        Usado
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </Row>
              </Col>

              <Col lg="auto" sm="2" xs="2">
                <Row>
                  <Button
                    color="primary"
                    style={{ cursor: 'pointer' }}
                    className="icon is-small btn-icon"
                    onClick={() => {
                      this.submitSearch();
                    }}
                  >
                    <img src="/assets/images/icon-search.svg" alt="" />
                  </Button>
                </Row>
              </Col>
              <div className="w-100 d-block d-lg-none" />
              <Col lg="auto">
                <Row>
                  <Button color="secondary" className="ml-4" href="/pledgeCredits" > Solicitá tu crédito</Button>
                </Row>
              </Col>
              <div className="w-100 d-block d-lg-none" />
              <Col lg="auto">
                <Row>
                  <Button color="secondary" className="btn-link" style={{ boxShadow: 'none' }} href="/friendlyAgency" >Consecionarias</Button>
                </Row>
              </Col>
              <div className="w-100 d-block d-lg-none" />
              {this.state.isUserLogged ? (
                <Col lg="auto">
                  <Row>
                    <ButtonDropdown
                      isOpen={this.state.dropdownUser}
                      toggle={this.toggleUser}
                    >
                      <Button style={{ cursor: 'pointer' }} color="primary" className={this.props.location.pathname === '/createPublication' ? 'active' : ''} onClick={() => this.props.history.push('/createPublication')} >Publica Ya!</Button>
                      <DropdownToggle caret color="default" className="btn-link btn-block">{this.state.nameFB ? this.state.nameFB : _.truncate(getUserDataFromToken().name, { length: 10 })}</DropdownToggle>
                      <DropdownMenu>
                        {!isAdminLogged() &&
                        <DropdownItem
                          value="myAccount"
                          onClick={() => (this.props.history.push('/userAdmin'))}
                        >Mi cuenta
                        </DropdownItem>}
                        {isAdminLogged() &&
                        <DropdownItem
                          value="myAccount"
                          onClick={() => (this.props.history.push('/admin'))}
                        >Administrador
                        </DropdownItem>}
                        <DropdownItem value="closeSession" onClick={() => this.clearSession()}>Cerrar Sesión</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Row>
                </Col>
              ) : (
                <Col lg="auto">
                  <Row>
                    <Col lg="auto">
                      <Row>
                        <ButtonDropdown
                          isOpen={this.state.dropdownOpenPublicate}
                          toggle={this.togglePublicate}
                        >
                          <DropdownToggle caret className="btn-link-active" style={{ width: '170px', boxShadow: 'none' }}>Publicá Gratis</DropdownToggle>
                          <DropdownMenu className="custom-dropdown">
                            <DropdownItem value="publicateFree" href="/withoutRegister">
                              <h4>¡Publica ya!</h4>
                              <h6>1 Publicación Gratis</h6>
                            </DropdownItem>
                            <DropdownItem value="particular" href="/userRegister">
                              <h4>Soy Particular. Registrate, es muy fácil</h4>
                              <h6>Publicaciones gratis ilimitadas</h6>
                            </DropdownItem>
                            <DropdownItem value="agency" href="/agencyRegister">
                              <h4>Soy un Concesionario. Registrate y vende más</h4>
                              <h6>Publicaciones gratis ilimitadas</h6>
                            </DropdownItem>
                            <DropdownItem value="particular" onClick={() => this.toggleModal()}>
                              <h4>Ya tengo cuenta</h4>
                            </DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </Row>
                    </Col>
                    <Col lg="auto">
                      <Row>
                        <Button color="default" className="btn-link" onClick={() => this.toggleModal()}>
                          Iniciá Sesión
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Col>
            )}
            </Row>
          </Col>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className={this.props.className}
            size="lg"
          >
            <ModalHeader toggle={this.toggleModal}>Iniciar sesión</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
                <FacebookLogin
                  appId="146328269397173"
                  autoLoad
                  callback={() => this.checkLoginState()}
                  icon="fa-facebook"
                  fields="name,email,picture"
                  textButton="Registrate con facebook"
                  cssClass="btn btn-primary btn-facebook"
                />
                <div className="underline" />
                <Input
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  validate={isValid => this.setState({ emailValidate: isValid })}
                />
                <Input
                  label="Contraseña"
                  type="password"
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                  validate={isValid => this.setState({ passwordValidate: isValid })}
                />
                <a onClick={() => { this.setState({ forgetPass: true }); }} style={{ cursor: 'pointer' }}>
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
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="row">
                <div className="col-3 float-left offset-3">
                  <Button
                    onClick={() => this.toggleModal()}
                    color="default"
                    className="alternative"
                  >
                      Salir
                  </Button>
                </div>
                <div className="col-3 float-right">
                  <Button
                    disabled={this.isLoginFormIncomplete()}
                    onClick={() => this.loginUser(this.state.email, this.state.password)}
                    color="primary"
                    className="alternative"
                  >
                    Iniciar sesión
                  </Button>
                </div>
                <div className="col-md-6 offset-md-3">
                  <div className="underline" />
                  <p>No tengo cuenta. Soy un particular. <a href="" className="btn-link">Registrarme</a></p>
                  <p>No tengo cuenta. Soy una concesionaria. <a href="" className="btn-link">Registrar Agencia</a></p>
                </div>
              </div>
            </ModalFooter>
          </Modal>
          <NotificationModal
            primaryText={this.state.modalTitle}
            secondaryText={this.state.modalMessage}
            buttonName="Aceptar"
            showNotificationModal={this.state.showModal}
            handleClose={() => this.setState({ showModal: false })}
          />
          <Notification
            isActive={this.state.isNotificationActive}
            message={`Bienvenido ${this.state.nameFB ? this.state.nameFB : getUserDataFromToken().name}!`}
            title="Hola!"
            barStyle={{ backgroundColor: '#48D2A0', zIndex: 3000, fontSize: '18px' }}
            dismissAfter={3500}
            onDismiss={this.toggleNotification}
            onClick={() => this.setState({ isNotificationActive: false })}
          />
        </Row>
      </div>
    );
  }
}
export default SearchBar;

