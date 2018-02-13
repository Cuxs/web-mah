import React from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


class SuperAdminSideBar extends React.Component {
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
    const { history, location } = this.props;
    return (
      <Col md="12" className="sidebar-user" >
        <ul>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminPublications' ? 'active' : ''} onClick={() => history.push('/superAdminPublications')} >Publicaciones</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminInbox' ? 'active' : ''} onClick={() => history.push('/superAdminInbox')} >Mensajes Directos</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminAllMessages' ? 'active' : ''} onClick={() => history.push('/superAdminAllMessages')} >Todos los mensajes</Button>
          </li>
          <li>
            <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminUsers' ? 'active' : ''} onClick={() => history.push('/superAdminUsers')} >Usuarios</Button>
          </li>
        </ul>
        <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={this.toggle} >Crear publicación</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Crear una publicación para</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Mail de Usuario</Label>
              <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggle()}>Salir</Button>
            <Button color="primary" onClick={() => history.push('/createPublication')}>Ir a Crear</Button>
          </ModalFooter>
        </Modal>
      </Col>
    );
  }
}

export default SuperAdminSideBar;
