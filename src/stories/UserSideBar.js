import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const UserAdmin = ({ history }) => (
  <Col md="12" className="d-flex flex-column" >
    <Button color="default" onClick={() => history.push('/userAdmin')} >Inicio</Button>
    <Button color="default" onClick={() => history.push('/userPublications')} >Tus publicaciones</Button>
    <Button color="default" onClick={() => history.push('/userInbox')} >Bandeja de entrada</Button>
    <Button color="default" onClick={() => history.push('/userProfile')} >Perfil</Button>
    <Button color="primary" onClick={() => history.push('/createPublication')} >Crear publicación</Button>
  </Col>
);

export default UserAdmin;
