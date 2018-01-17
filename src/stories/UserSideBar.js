import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const UserAdmin = () => (
  <Col md="12" className="d-flex flex-column" >
    <Button color="default" href="/userAdmin" >Inicio</Button>
    <Button color="default" href="/userPublications" >Tus publicaciones</Button>
    <Button color="default" href="/userInbox" >Bandeja de entrada</Button>
    <Button color="default" href="/userProfile" >Perfil</Button>
    <Button color="primary" href="/createPublication" >Crear publicación</Button>
  </Col>
);

export default UserAdmin;
