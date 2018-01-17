/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import AdminSideBar from '../../stories/AdminSideBar';


import style from '../../Styles/pledgeCredits';

class AgencyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <AdminBar history={this.props.history} />

        <Row>
          <Col md="3">
            <AdminSideBar history={this.props.history} location={this.props.location} />
          </Col>
          <Col md="9">
            <Row>
              <Col md="5">
                <h6><b>NOMBRE Y APELLIDO</b></h6>
                <h4>Rodrigo Valles</h4>
                <h6><b>DNI</b></h6>
                <h4>33987654</h4>
                <h6><b>DOMICILIO</b></h6>
                <h4>Palero 20, Ciudad, Mendoza.</h4>
                <h6><b>EMAIL DE CONTACTO</b></h6>
                <h4>rodrigo@gmail.com</h4>
                <h6><b>TELEFONO DE CONTACTO</b></h6>
                <h4>261-5951833</h4>
                <Button type="secondary">Modificar</Button>
              </Col>
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

export default AgencyProfile;
