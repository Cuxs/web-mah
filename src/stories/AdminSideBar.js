import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const AgencyAdmin = () => (
  <Col md="12" className="d-flex flex-column" >
    <Button color="default" href="/agencyAdmin" >Inicio</Button>
    <Button color="default" href="/agencyPublications" >Tus publicaciones</Button>
    <Button color="default" href="/agencyInbox" >Bandeja de entrada</Button>
    <Button color="default" href="/agencyProfile" >Perfil</Button>
    <Button color="default" href="/agencyMicrosite" >Micrositio</Button>
    <Button color="primary" href="/createPublication" >Crear publicación</Button>
  </Col>
);

export default AgencyAdmin;
