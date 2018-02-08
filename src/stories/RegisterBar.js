import React, { Component } from 'react';
import { Col, Row, Button, ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Notification } from 'react-notification';
import { isUserLogged, getUserDataFromToken, clearSession } from '../Modules/sessionFunctions';
import { login } from '../Modules/fetches';
import { saveState } from '../Modules/localStorage';
import parseError from '../Modules/errorParser';
import NotificationModal from './NotificationModal';

/* eslint react/jsx-filename-extension: 0 */

export default class RegisterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isUserLogged: isUserLogged(),
      showErrorModal: false,
      dropdownUser: false,
      errorTitle: '',
      showErrorModal: false,
      errorMessage: '',
      isNotificationActive: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.isLoginFormIncomplete = this.isLoginFormIncomplete.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
  }

  isLoginFormIncomplete() {
    if (this.state.email === '' || this.state.password === '') {
      return true;
    }
    return false;
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
  toggleUser() {
    this.setState({
      dropdownUser: !this.state.dropdownUser,
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
          errorTitle: errorParsed.title,
          errorMessage: errorParsed.message,
          showErrorModal: true,
        });
      });
  }

  render() {
    const { onlyLogin, history } = this.props;
    return (
      <div className="container-fluid">
        <Row className="header">
          <Col md="3" sm="6" xs="6">
            <Row>
              <a onClick={() => this.props.history.push('/')} >
                <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
              </a>
            </Row>
          </Col>

          <Col md="9" sm="6" xs="6" className="text-right">
            <div className="d-none d-md-block">
              { !onlyLogin &&
              <div className="d-inline-block">
                <Button color="secondary" className="btn-link">BENEFICIOS</Button>
                <Button color="secondary" className="btn-link">PLANES</Button>
                <Button color="secondary" className="btn-link">AYUDA</Button>
                {this.state.isUserLogged ? (
                  <ButtonDropdown
                    isOpen={this.state.dropdownUser}
                    toggle={this.toggleUser}
                    className="dropdown-register-bar"
                  >
                    <DropdownToggle caret>{getUserDataFromToken().name}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        value="myAccount"
                        onClick={() => (this.props.history.push('/userAdmin'))}
                      >Mi cuenta
                      </DropdownItem>
                      <DropdownItem value="closeSession" onClick={() => { clearSession(); this.setState({ isUserLogged: false }); }}>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
              ) : (
                <Button color="primary" onClick={() => this.toggleModal()} className="btn-link">INICIAR SESIÓN</Button>
              )}
              </div>
            }
            </div>
            <div className="d-inline-block d-md-none">
              <ButtonDropdown
                isOpen="true"
                toggle="true"
              >
                <DropdownToggle caret color="default" className="btn-link btn-block" style={{ width: '100px' }}>
              MENU
                </DropdownToggle>
                <DropdownMenu>
                  { !onlyLogin &&
                  <div>
                    <DropdownItem
                      value="Beneficios"
                    >
                    Beneficios
                    </DropdownItem>
                    <DropdownItem
                      value="Planes"
                    >
                    Planes
                    </DropdownItem>
                    <DropdownItem
                      value="Ayuda"
                    >
                    Ayuda
                    </DropdownItem>
                    <DropdownItem divider />
                  </div>
              }
                  <DropdownItem
                    value="iniciar sesion"
                  >
                Iniciar Sesión
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </Col>
        </Row>
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
                <Label for="exampleEmail">Contraseña </Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  placeholder="******"
                />
                <a href="">¿Olvidaste tu contraseña?</a>
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
        <Notification
          isActive={this.state.isNotificationActive}
          message={`Bienvenido ${getUserDataFromToken().name}!`}
          title="Hola!"
          barStyle={{ backgroundColor: '#48D2A0', zIndex: 3000, fontSize: '18px' }}
          dismissAfter={3500}
          onDismiss={this.toggleNotification}
          onClick={() => this.setState({ isNotificationActive: false })}
        />
      </div>
    );
  }
}
