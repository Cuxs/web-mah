/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import ScrollToTop from 'react-scroll-up';

import AdminBar from '../../../stories/AdminBar';
import UserSideBar from '../../../stories/UserSideBar';
import { UserDetailQuery, UserDataMutation, UserPasswordMutation } from '../../../ApolloQueries/UserProfileQuery';
import { getUserToken, isUserLogged } from '../../../Modules/sessionFunctions';
import LoginComponent from '../../../stories/LoginComponent';

const renderForUnloggedUser = (component, propName = 'data') =>
  branch(
    props => !isUserLogged(),
    renderComponent(component),
  );

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyActive: false,
      name: 'Cargando...',
      address: 'Cargando...',
      phone: 'Cargando...',
      email: 'Cargando...',
      oldPassword: '',
      newPassword: '',
      repeatNpass: '',
      responseMsg: '',
      responseTitle: '',
      modal: false,
    };
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.userProfile.loading) {
      this.setState({
        name: newProps.userProfile.User.name,
        address: newProps.userProfile.User.address,
        email: newProps.userProfile.User.email,
        phone: newProps.userProfile.User.phone,
      });
    }
  }
  toggle() {
    this.setState({
      modifyActive: !this.state.modifyActive,
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  update() {
    this.props.updateData({
      variables: {
        MAHtoken: getUserToken(),
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone,
      },
      refetchQueries: ['User'],
    }).then(({ data: { modifyUserData: uData } }) => {
      this.setState({
        modal: true,
        name: uData.name,
        address: uData.address,
        phone: uData.phone,
        responseTitle: 'Felicitaciones',
        responseMsg: 'Datos actualizados con éxito',
      });
      this.toggle();
    }).catch(err => console.log(err));
  }
  updatePassword() {
    this.props.updatePassword({
      variables: {
        MAHtoken: getUserToken(),
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      },
    }).then(() => {
      this.setState({
        modal: true,
        oldPassword: '',
        newPassword: '',
        repeatNpass: '',
        responseTitle: 'Felicitaciones',
        responseMsg: 'Contraseña actualizada con éxito',
      });
    }).catch(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message }) =>
          this.setState({
            responseTitle: 'Error',
            responseMsg: message,
            modal: true,
          }));
      }
      if (networkError) {
        this.setState({
          responseTitle: 'Error',
          responseMsg: networkError,
          modal: true,
        });
      }
    });
  }
  isPasswordFormInvalid() {
    if (this.state.newPassword !== this.state.repeatNpass ||
    this.state.newPassword === '') {
      return true;
    }
    return false;
  }

  render() {
    const {
      history, location, userProfile,
    } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12" className="mt-4">
              <Row>
                {!userProfile.loading &&
                <Col lg="6" md="8" sm="12" className="container-data-input-group">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <div className="data-input-group">
                      <label>NOMBRE Y APELLIDO</label>
                      {this.state.modifyActive ?
                        <Input type="text" name="name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                : <p>{this.state.name}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>DOMICILIO</label>
                      {this.state.modifyActive ?
                        <Input type="text" name="address" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                  : <p>{this.state.address}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>EMAIL DE CONTACTO <small>(Mail de inicio de sesión)</small></label>
                      <p>{this.state.email}</p>
                    </div>
                    <div className="data-input-group">

                      <label>TELEFONO DE CONTACTO</label>
                      {this.state.modifyActive ?
                        <Input type="text" name="phone" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                  : <p>{this.state.phone}</p>}
                    </div>
                    <div className="underline" />
                    {this.state.modifyActive ?
                      <span>
                        <Button color="secondary" className="btn-link-warning align-self-end" onClick={() => this.toggle()} >Cancelar</Button>
                        <Button color="primary" className="btn-link-primary align-self-end" onClick={() => this.update()}>  <img src="/assets/images/icon-check-red.svg" alt="" />Guardar</Button>
                      </span>
                  : <Button className="btn-link-primary align-self-end" color="primary" onClick={() => this.setState({ modifyActive: true })} >Modificar</Button>}
                  </div>
                </Col>}
                <Col lg="6" md="8" sm="12" className="container-data-input-group">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <h6 className="title-division"><b>¿Quieres cambiar la contraseña?</b></h6>
                    <FormGroup>
                      <Label for="exampleEmail">Contraseña actual</Label>
                      <Input type="password" onChange={e => this.setState({ oldPassword: e.target.value })} value={this.state.oldPassword} name="password" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Nueva Contraseña</Label>
                      <Input type="password" onChange={e => this.setState({ repeatNpass: e.target.value })} value={this.state.repeatNpass} name="password" id="exampleText" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Repetir nueva Contraseña</Label>
                      <Input type="password" onChange={e => this.setState({ newPassword: e.target.value })} value={this.state.newPassword} name="password" id="exampleText" />
                    </FormGroup>
                    <Button type="secondary" className="btn-link-primary align-self-end" disabled={this.isPasswordFormInvalid()} onClick={() => this.updatePassword()}><img src="/assets/images/icon-check-red.svg" alt="" />Cambiar</Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <ScrollToTop showUnder={320} >
            <img style={{ width: '30px' }} src="/assets/images/icon-arrow-top.svg" alt="Inicio" />
          </ScrollToTop>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.state.responseTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              <h5>{this.state.responseMsg}</h5>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleModal()}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
  },
});

const withUserData = graphql(UserDetailQuery, { name: 'userProfile', options });
const withUserDataMutation = graphql(UserDataMutation, { name: 'updateData' });
const withPasswordMutation = graphql(UserPasswordMutation, { name: 'updatePassword' });
const withData = compose(
  withUserData,
  renderForUnloggedUser(LoginComponent, 'userProfile'),
  withUserDataMutation,
  withPasswordMutation,
);

export default withData(UserProfile);
