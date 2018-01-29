import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {
  Input,
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
  FormGroup,
  Label,
} from 'reactstrap';
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
} from '../Modules/sessionFunctions';
import NotificationModal from '../stories/NotificationModal';
import parseError from '../Modules/errorParser';
import { login } from '../Modules/fetches';
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
      email: '',
      password: '',
      showErrorModal: false,
      errorTitle: '',
      errorMessage: '',
      isUserLogged: isUserLogged(),
      carState:
        this.props.carState === undefined ? 'Usado' : this.props.carState,
      value: this.props.text === undefined ? '' : this.props.text,
    };
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
    if (this.state.email === '' || this.state.password === '') {
      return true;
    }
    return false;
  }
  submitSearch() {
    this.props.history.push(`/SearchCars?text=${this.state.value}&carState=${
      this.state.carState
    }`);
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
  loginUser(email, password) {
    login(email, password)
      .then((response) => {
        const MAHtoken = response.message;
        saveState({ login: { MAHtoken } });
        this.toggleModal();
        this.setState({
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
          errorTitle: errorParsed.title,
          errorMessage: errorParsed.message,
          showErrorModal: true,
        });
      });
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
          <Col md="6">

            <Row className="align-items-center">
              <Col md="3">
                <Row>
                  <a onClick={() => this.props.history.push('/')} >
                    <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
                  </a>
                </Row>
              </Col>
              <Col md="4">
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
              <Col md="3">
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

              <Col md="auto">
                <Row>
                  <Button
                    style={{ cursor: 'pointer' }}
                    className="icon is-small"
                    onClick={() => {
                      this.submitSearch();
                    }}
                    className="icon is-small btn-icon"
                  >
                    <img src="/assets/images/icon-search.svg" alt="" />
                  </Button>
                </Row>
              </Col>


            </Row>
          </Col>
          <Col md="6" className="flex-row-reverse">
            <Row className="align-items-center area-btns justify-content-start">
              <Col md="auto">
                <Row>
                  <Button color="primary" href="/pledgeCredits" > Solicitá tu crédito</Button>
                </Row>
              </Col>
              <Col md="3">
                <Row>
                  <Button color="secondary" className="btn-link" href="/friendlyAgency" >Consecionarias</Button>
                </Row>
              </Col>
              {this.state.isUserLogged ? (
                <Col md="3">
                  <Row>
                    <ButtonDropdown
                      isOpen={this.state.dropdownUser}
                      toggle={this.toggleUser}
                    >
                      <DropdownToggle caret className="btn-link-active btn-block">{getUserDataFromToken().name}</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          value="myAccount"
                          onClick={() => (this.props.history.push('/userAdmin'))}
                        >Mi cuenta
                        </DropdownItem>
                        <DropdownItem value="closeSession" onClick={() => { clearSession(); this.setState({ isUserLogged: false }); }}>Cerrar Sesión</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Row>
                </Col>
              ) : (
                <Col md="auto">
                  <Row>
                    <Col md="auto">
                      <Row>
                        <ButtonDropdown
                          isOpen={this.state.dropdownOpenPublicate}
                          toggle={this.togglePublicate}
                        >
                          <DropdownToggle caret className="btn-link-active" style={{ width: '170px' }}>Publicá Gratis</DropdownToggle>
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
                    <Col md="auto">
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
                <Button color="primary" className="btn-facebook"><img src="/assets/images/icon-single-facebook.svg" /> Registrate con facebook</Button>
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
                  <Label for="exampleEmail">Contraseña <a href="">¿Olvidaste tu contraseña?</a></Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    placeholder="123456"
                  />
                </FormGroup>

              </div>

            </ModalBody>
            <ModalFooter>
              <div className="row">
                <div className="col-3 float-left offset-3">
                  <Button
                    disabled={this.isLoginFormIncomplete()}
                    onClick={() => this.loginUser(this.state.email, this.state.password)}
                    color="primary"
                    className="alternative"
                  >
                    Iniciar sesión
                  </Button>
                </div>
                <div className="col-3 float-right">
                  <Button
                    onClick={() => this.toggleModal()}
                    color="default"
                    className="alternative"
                  >
                    Salir
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
            primaryText={this.state.errorTitle}
            secondaryText={this.state.errorMessage}
            buttonName="Aceptar"
            showNotificationModal={this.state.showErrorModal}
            handleClose={() => this.setState({ showErrorModal: false })}
          />
        </Row>
      </div>
    );
  }
}
export default SearchBar;
