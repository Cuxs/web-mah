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
      modal: false,
    };
  }

  render() {
    const {
      history, location, userProfile, userProfile: { User },
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
                  <div className="card p-4" style={{height:`100%`}}>
                    <div className="data-input-group">
                      <label>NOMBRE Y APELLIDO</label>
                      <p>{User.name || 'No especificado'}</p>
                    </div>

                    <div className="data-input-group">
                      <label>DOMICILIO</label>
                      <p>{User.address || 'No especificado'}</p>
                    </div>

                    <div className="data-input-group">
                      <label>EMAIL DE CONTACTO</label>
                      <p>{User.email}</p>
                    </div>


                    <div className="data-input-group">
                      <label>TELEFONO DE CONTACTO</label>
                      <p>{User.phone || 'No especificado'}</p>
                    </div>

                    <div class="underline"></div>
                    <Button type="primary" className="btn-link-primary align-self-end">
                      <img src="/assets/images/icon-edit-red.svg" alt="" />
                      Editar
                    </Button>
                  </div>
                </Col>}
                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{height:`100%`}}>
                    <h6 className="title-division"><b>¿Quieres cambiar la contraseña?</b></h6>
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
                    <Button type="secondary" className="btn-link-primary align-self-end">
                      <img src="/assets/images/icon-check-red.svg" alt="" />
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
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
