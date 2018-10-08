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

import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { validate } from '../Modules/functions';
import { scroller } from 'react-scroll';

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
      modalVender: false,
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
    this.toggleModalVender = this.toggleModalVender.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.recoverPass = this.recoverPass.bind(this);
    this.disabled = this.disabled.bind(this);
    this.loginFB = this.loginFB.bind(this);
    this.pledgeCredits = this.pledgeCredits.bind(this);
    this.home = this.home.bind(this);
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
        offset: -100,
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
  toggleModalVender() {
    this.setState({
      modalVender: !this.state.modalVender,
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

  home() {
    ReactGA.event({
      category: `SearchBar ${this.props.history.location.pathname}`,
      action: 'Ir a Home',
    });
    return this.props.history.push('/');
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
        offset: -100,
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

  renderButton(icon, title, subtitle) {
    return (
      <button className="btn-type-seller">
        <div className="col-2" >
          <img src={`/assets/images/icon-${icon}.svg`} alt="" />
        </div>
        <div className="col-10" >
          <div className="d-flex flex-column justify-content-start" >
            <h4>{title}</h4>
            <h6>{subtitle}</h6>
          </div>
        </div>
      </button>
    );
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '¿Que estás buscando?',
      value,
      onChange: this.onChange,
    };
    const haveTopBar = (this.props.location.pathname === '/' || this.props.location.pathname === '/friendlyAgency' || _.startsWith(this.props.location.pathname, '/microsite') || _.startsWith(this.props.location.pathname, '/carDetail') || _.startsWith(this.props.location.pathname, '/SearchCars') || _.startsWith(this.props.location.pathname, '/hire123'));
    const haveToBanner = (this.props.location.pathname === '/friendlyAgency' || _.startsWith(this.props.location.pathname, '/carDetail') || _.startsWith(this.props.location.pathname, '/SearchCars') || _.startsWith(this.props.location.pathname, '/hire123'));
    return (
      <div className="container-fluid" style={{ marginBottom: haveToBanner ? '140px' : '90px' }} >
        <Row className="header" style={{ top: '0px' }}>
          <Col md="2" className="brand">
            <Row>
              <a onClick={() => this.props.history.push('/')} className="ml-3" >
                <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
              </a>
            </Row>
          </Col>
          <div className="d-lg-none">
            <Button color="primary" onClick={() => this.setState({ sidebar: 'active' })} className="float-left btn-sidebar-open btn-link-primary">
              <img src="/assets/images/icon-menu.svg" alt="" />
            </Button>
          </div>
          <Col md="10">
            <Row className="align-items-center area-btns justify-content-between">
              <div className="d-flex flex-row search" >
                <Col lg="12" xs="12" sm="12">
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
                      onFocus={() => console.log('focusss')}
                    />
                    <style jsx="true" >{autocompleteStyles}</style>
                  </Row>
                </Col>
                <Col lg="auto" sm="2" xs="2">
                  <Row>
                    <Button
                      color="primary"
                      style={{ cursor: 'pointer', padding: '10px 20px' }}
                      className="icon is-small btn-icon"
                      onClick={() => {
                      this.submitSearch();
                    }}
                    >
                      <img src="/assets/images/icon-search-red.svg" alt="" />
                    </Button>
                  </Row>
                </Col>
              </div>
              <div className="sell-mobile">
                {this.state.isUserLogged ?
                  <Button color="primary" className="mr-4 btn-seller" onClick={() => this.props.history.push('/createPublication')}>
                    Vender
                  </Button>
                :
                  <Button color="primary" className="mr-4 btn-seller" onClick={() => this.toggleModalVender()}>
                    Vender
                  </Button>
                }
              </div>
              <div className={`d-flex flex-row sidebar-mobile ${this.state.sidebar}`} >
                <Button color="primary" onClick={() => this.setState({ sidebar: '' })} className="btn-link-primary btn-sidebar-close d-none">
                  <img src="/assets/images/icon-close.svg" alt="" />
                </Button>
                <div className="w-100 d-block d-lg-none" />
                <Col lg="auto">
                  <Row>
                    <Button color="default-menu" className="ml-4" onClick={this.home} >Inicio</Button>
                  </Row>
                </Col>
                <div className="w-100 d-block d-lg-none" />
                <Col lg="auto">
                  <Row>
                    <Button color="default-menu" className="ml-4" onClick={this.pledgeCredits} >Financiación</Button>
                  </Row>
                </Col>
                <div className="w-100 d-block d-lg-none" />
                <Col lg="auto">
                  <Row>
                    <Button color="default-menu" onClick={this.friendlyAgency} >Concesionarias</Button>
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
                        <DropdownToggle caret color="default-menu mr-4">{this.state.nameFB ? this.state.nameFB : _.truncate(getUserDataFromToken().name, { length: 18 })}</DropdownToggle>
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
                        <Button color="primary" className="btn-seller" onClick={() => this.props.history.push('/createPublication')}>
                          Vender
                        </Button>
                      </ButtonDropdown>
                    </Row>
                  </Col>
              ) : (
                <Col lg="auto">
                  <Row>
                    <Col lg="auto" sm="12">
                      <Row>
                        <Button color="default-menu" className="mr-4" onClick={() => this.toggleModal()}>
                          Iniciá Sesión
                        </Button>
                      </Row>
                    </Col>
                    <Col lg="auto" sm="12" className="d-none d-md-block d-lg-none" >
                      <Button color="primary" onClick={() => this.toggleModalVender()}>
                          Vender
                      </Button>
                    </Col>
                  </Row>
                </Col>
            )}
              </div>
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
                    validate={validate('email')}
                    className="form-control"
                  />
                  <AvField
                    label="Contraseña"
                    type="password"
                    value={this.state.password}
                    onChange={event => this.setState({ password: event.target.value })}
                    name="password"
                    id="password"
                    validate={validate('password')}
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
                        validate={validate('email')}
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
                <p style={{ marginBottom: '0' }}>No tengo cuenta. Soy un particular. <button style={{ fontSize: '12px' }} onClick={() => this.props.history.push('/userRegister')} className="btn-link">Registrarme</button></p>
                <p>No tengo cuenta. Soy una concesionaria. <button style={{ fontSize: '12px', margin: 'none' }} onClick={() => this.props.history.push('/agencyRegister')} className="btn-link">Registrar Agencia</button></p>
              </div>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state.modalVender}
            toggle={this.toggleModalVender}
            className={this.props.className}
            size="md"
          >
            <ModalHeader toggle={this.toggleModalVender}>¿Qué tipo de vendedor sos?</ModalHeader>
            <ModalBody style={{ padding: '0px' }} >
              <div className="col-md-12">
                {this.renderButton('rayo', 'Publicación inmediata', '1 publicación gratis')}
                {this.renderButton('llaves', 'Soy un particular. Registrate es muy fácil!', 'Publicaciones gratis ilimitadas')}
                {this.renderButton('auto', 'Soy un Concesionario', 'Publicaciones gratis ilimitadas')}
                {this.renderButton('comercial', 'Soy una comercializadora', 'Publicaciones gratis ilimitadas')}
              </div>
            </ModalBody>
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

