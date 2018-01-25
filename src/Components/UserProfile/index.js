/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

import AdminBar from '../../stories/AdminBar';
import UserSideBar from '../../stories/UserSideBar';
import { UserDetailQuery } from '../../ApolloQueries/UserProfileQuery';
import { getUserDataFromToken } from '../../Modules/sessionFunctions';
import style from '../../Styles/pledgeCredits';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyActive: false,
    };
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

  update() {
    // Marianiiitooo aca la funcion de guardar
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
                : <h4>{User.name}</h4>}
                <h6><b>DOMICILIO</b></h6>
                {this.state.modifyActive ?
                  <Input type="text" name="address" value={this.state.address} onChange={event => this.setState({ address: event.target.value })} />
                  : <h4>{User.address}</h4>}
                <h6><b>EMAIL DE CONTACTO</b></h6>
                {this.state.modifyActive ?
                  <Input type="email" name="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                  : <h4>{User.email}</h4>}
                <h6><b>TELEFONO DE CONTACTO</b></h6>
                {this.state.modifyActive ?
                  <Input type="text" name="phone" value={this.state.phone} onChange={event => this.setState({ phone: event.target.value })} />
                  : <h4>{User.phone}</h4>}
                {this.state.modifyActive ?
                  <Button color="primary" onClick={() => this.update()} >Guardar</Button>
                  : <Button color="secondary" onClick={() => this.setState({ modifyActive: true })} >Modificar</Button>}
              </Col>}
              <Col md="5">
                <h6><b>¿Quieres cambiar la contraseña?</b></h6>
                <FormGroup>
                  <Label for="exampleEmail">Contraseña actual</Label>
                  <Input type="password" name="password" id="exampleText" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Nueva Contraseña</Label>
                  <Input type="password" name="password" id="exampleText" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Repetir nueva Contraseña</Label>
                  <Input type="password" name="password" id="exampleText" />
                </FormGroup>
                <Button type="secondary">Cambiar</Button>
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
const withData = compose(withUserData);

export default withData(UserProfile);
