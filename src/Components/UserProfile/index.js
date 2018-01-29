/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

import AdminBar from '../../stories/AdminBar';
import UserSideBar from '../../stories/UserSideBar';
import { UserDetailQuery, UserDataMutation, UserPasswordMutation } from '../../ApolloQueries/UserProfileQuery';
import { getUserDataFromToken, getUserToken } from '../../Modules/sessionFunctions';
import style from '../../Styles/pledgeCredits';

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
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col md="9" className="mt-4">
              <Row>
                {!userProfile.loading &&
                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <div className="data-input-group">
                      <label>NOMBRE Y APELLIDO</label>
                      {this.state.modifyActive ?
                        <Input type="text" name="name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                : <p>{this.state.name}</p>}
                    </div>
                    <div className="data-input-group">
                      <h6><b>DOMICILIO</b></h6>
                      {this.state.modifyActive ?
                        <Input type="text" name="address" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                  : <p>{this.state.address}</p>}
                    </div>
                    <div className="data-input-group">

                      <h6><b>EMAIL DE CONTACTO</b></h6>
                      <p>{this.state.email}</p>
                    </div>
                    <div className="data-input-group">

                      <h6><b>TELEFONO DE CONTACTO</b></h6>
                      {this.state.modifyActive ?
                        <Input type="text" name="phone" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                  : <p>{this.state.phone}</p>}
                    </div>
                    <div className="underline" />
                    {this.state.modifyActive ?
                      <span>
                        <Button color="primary" onClick={() => this.update()} >Guardar</Button>
                        <Button color="warning" onClick={() => this.toggle()} >Cancelar</Button>
                      </span>
                  : <Button className="btn-link-primary align-self-end" color="primary" onClick={() => this.setState({ modifyActive: true })} >Modificar</Button>}
                  </div>
                </Col>}
                <Col md="6" className="container-data-input-group">
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
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.state.responseTitle}</ModalHeader>
          <ModalBody>
            <h5>{this.state.responseMsg}</h5>
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
    id: getUserDataFromToken().id,
  },
});

const withUserData = graphql(UserDetailQuery, { name: 'userProfile', options });
const withUserDataMutation = graphql(UserDataMutation, { name: 'updateData' });
const withPasswordMutation = graphql(UserPasswordMutation, { name: 'updatePassword' });
const withData = compose(withUserData, withUserDataMutation, withPasswordMutation);

export default withData(UserProfile);
