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
import ReactGA from 'react-ga';
import { animateScroll as scroll } from 'react-scroll';

import { AvForm, AvGroup, AvField } from "availity-reactstrap-validation";
import { validate } from "../Modules/functions";
import {scroller} from 'react-scroll';

import _ from 'lodash';
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
import NotificationModal from '../stories/NotificationModal';
import parseError from '../Modules/errorParser';
import { login, recoverPassword, checkFacebookLogin, loginOrRegisterFacebook } from '../Modules/fetches';
import { saveState } from '../Modules/localStorage';
/* eslint react/jsx-filename-extension: 0 */

ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

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
    this.pledgeCredits = this.pledgeCredits.bind(this);
    this.friendlyAgency = this.friendlyAgency.bind(this);
    this.withoutRegister = this.withoutRegister.bind(this);
    this.agencyRegister = this.agencyRegister.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }

  componentDidMount() {
    scroll.scrollToTop({ duration: 300 });
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '146328269397173',
        cookie: true,
        xfbml: true,
        version: 'v2.1',
      });
      this.checkLoginState();
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
  submitSearch(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: 'Ir a Buscar autos',
    });
    this.setState({ sidebar: '' });
    this.props.history.push(`/SearchCars?text=${this.state.value}&carState=${
      this.state.carState
    }`);
  }

  checkLoginState() {
    window.FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
    });
  }
  loginFB() {
    window.FB.getLoginStatus((response) => {
      window.FB.api('/me', { fields: ['email', 'name'] }, (res) => {
        loginOrRegisterFacebook(res)
          .then((resp) => {
            const MAHtoken = resp.message;
            saveState({ login: { MAHtoken } });
            this.toggleModal();
            this.setState({
              isNotificationActive: true,
              email: '',
              password: '',
              isUserLogged: true,
            });
          })
          .catch(error => console.log(error));
      });
    });
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
      window.FB.api('/me', { fields: ['email', 'name'] }, (res) => {
        checkFacebookLogin(res.email)
          .then((resp) => {
            const MAHtoken = resp.message;
            saveState({ login: { MAHtoken } });
            this.setState({
              isNotificationActive: true,
              email: '',
              password: '',
              isUserLogged: true,
            });
          })
          .catch(error => console.log(error));
      });
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
  pledgeCredits() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: 'Ir a Créditos Prendarios',
    });
    return this.props.history.push('/pledgeCredits');
  }

  friendlyAgency() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: 'Ir a Concesionarias',
    });
    return this.props.history.push('/friendlyAgency');
  }

  withoutRegister() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: 'Ir a Publicá ya',
    });
    return this.props.history.push('/withoutRegister');
  }

  userRegister() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: 'Ir a Registro Usuario',
    });
    return this.props.history.push('/userRegister');
  }

  agencyRegister() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: 'Ir a Registro Agencia',
    });
    return this.props.history.push('/agencyRegister');
  }

  loginUser(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    login(this.state.email, this.state.password)
      .then((response) => {
        const MAHtoken = response.message;
        saveState({ login: { MAHtoken } });
        this.toggleModal();
        ReactGA.event({
          category: `SearchBar ${this.props.history.location.pathname}`,
          action: 'Ir a Login',
        });
        this.setState({
          isNotificationActive: true,
          email: '',
          password: '',
          isUserLogged: true,
        });
        if (isAdminLogged()) {
          return this.props.history.push('/admin');
        }
        return this.props.history.push('/userAdmin');
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
    try {
      window.FB.logout();
    } catch (e) {
      console.log(e);
    }
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
                  <style jsx="true" >{autocompleteStyles}</style>
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
                  <Button color="secondary" onClick={this.pledgeCredits} className="ml-4" > Solicitá tu crédito</Button>
                </Row>
              </Col>
              <div className="w-100 d-block d-lg-none" />
              <Col lg="auto">
                <Row>
                  <Button color="secondary" onClick={this.friendlyAgency} className="btn-link" style={{ boxShadow: 'none' }} >Concesionarias</Button>
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
                    <Col lg="auto" sm="12" >
                      <Row>
                        <ButtonDropdown
                          isOpen={this.state.dropdownOpenPublicate}
                          toggle={this.togglePublicate}
                        >
                          <DropdownToggle caret className="btn-link-active" style={{ width: '160px', boxShadow: 'none' }}>Publicá Gratis</DropdownToggle>
                          <DropdownMenu className="custom-dropdown">
                            <DropdownItem value="publicateFree" onClick={this.withoutRegister}>
                              <h4>¡Publica ya!</h4>
                              <h6>1 Publicación Gratis</h6>
                            </DropdownItem>
                            <DropdownItem value="particular" onClick={this.userRegister}>
                              <h4>Soy Particular. Registrate, es muy fácil</h4>
                              <h6>Publicaciones gratis ilimitadas</h6>
                            </DropdownItem>
                            <DropdownItem value="agency" onClick={this.agencyRegister}>
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
                    <Col lg="auto" sm="12">
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
            size="md"
          >
            <ModalHeader toggle={this.toggleModal}>Iniciar sesión</ModalHeader>
            <ModalBody>
              <div className="col-md-10 offset-md-1">
              <AvForm onSubmit={this.loginUser}>
                <FacebookLogin
                  appId="146328269397173"
                  autoLoad
                  callback={() => this.loginFB()}
                  icon="fa-facebook"
                  fields="name,email,picture"
                  textButton="Registrate con facebook"
                  cssClass="btn btn-primary btn-facebook"
                />
                <div className="underline" />
                <AvField
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  name="email"
                  id="email"
                  validate={validate("email")}
                  className="form-control"
                />
                <AvField
                  label="Contraseña"
                  type="password"
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                   name="password"
                  id="password"
                  validate={validate("password")}
                  className="form-control"
                />
                <a onClick={() => { this.setState({ forgetPass: true }); }} style={{ cursor: 'pointer', color: '#E40019' }}>
                  ¿Olvidaste tu contraseña?
                </a>
                {this.state.forgetPass && (
                  <div style={{ paddingTop: '20px' }}>
                    <Label>Ingresa tu email para poder recuperarla </Label>
                    <AvForm onSubmit={this.recoverPass}>
                    <AvField
                      style={{ display: 'inline' }}
                      type="email"
                      value={this.state.recoverPassEmail}
                      onChange={e =>
                      this.setState({ recoverPassEmail: e.target.value })}
                      name="email"
                      id="email"
                      validate={validate("email")}
                      className="form-control"
                    />
                    {this.state.displayError && <small style={{ color: 'red' }}>{this.state.error}</small>}
                    <Button color="secondary" type="submit" className="alternative" style={{ display: 'inline' }}>Recuperar </Button>
                    </AvForm>
                    {this.state.loading && <img
                      style={{ height: '85px', paddingTop: '10px' }}
                      src="/loading.gif"
                      key={0}
                      alt="Loading..."
                    />}
                  </div>
                )}
                <div className="row">
                <div className="col-3 float-left offset-md-2">
                  <Button
                    onClick={() => this.toggleModal()}
                    color="default"
                    className="alternative"
                    style={{ height: '50px' }}
                  >
                      Salir
                  </Button>
                </div>
                <div className="col-6 float-right">
                  <Button
                    type="submit"
                    color="primary"
                    className="alternative"
                  >
                    Iniciar sesión
                  </Button>
                </div>
                </div>
                </AvForm>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="col-md-10">
                <p style={{ marginBottom: '0' }}>No tengo cuenta. Soy un particular. <a href="" className="btn-link">Registrarme</a></p>
                <p>No tengo cuenta. Soy una concesionaria. <a href="" className="btn-link">Registrar Agencia</a></p>
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

