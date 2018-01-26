/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
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
        name: uData.name,
        address: uData.address,
        phone: uData.phone,
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
    }).then(({ data: { updatePassword } }) => {
      this.setState({
        oldPassword: '',
        newPassword: '',
        repeatNpass: '',
      });
      console.log(updatePassword);
    }).catch(err => console.log(err));
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
      history, location, userProfile, userProfile: { User },
    } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <Row>
          <Col md="3">
            <UserSideBar history={history} location={location} />
          </Col>
          <Col md="9">
            <Row>
              {!userProfile.loading &&
              <Col md="5">
                <h6><b>NOMBRE Y APELLIDO</b></h6>
                {this.state.modifyActive ?
                  <Input type="text" name="name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                : <h4>{this.state.name}</h4>}
                <h6><b>DOMICILIO</b></h6>
                {this.state.modifyActive ?
                  <Input type="text" name="address" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                  : <h4>{this.state.address}</h4>}
                <h6><b>EMAIL DE CONTACTO</b></h6>
                <h4>{this.state.email}</h4>
                <h6><b>TELEFONO DE CONTACTO</b></h6>
                {this.state.modifyActive ?
                  <Input type="text" name="phone" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                  : <h4>{this.state.phone}</h4>}
                {this.state.modifyActive ?
                  <span>
                    <Button color="primary" onClick={() => this.update()} >Guardar</Button>
                    <Button color="warning" onClick={() => this.toggle()} >Cancelar</Button>
                  </span>
                  : <Button color="secondary" onClick={() => this.setState({ modifyActive: true })} >Modificar</Button>}
              </Col>}
              <Col md="5">
                <h6><b>¿Quieres cambiar la contraseña?</b></h6>
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
                <Button type="secondary" disabled={this.isPasswordFormInvalid()} onClick={() => this.updatePassword()}>Cambiar</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <style jsx>{style}</style>
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
