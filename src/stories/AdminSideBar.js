import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const AgencyAdmin = () => (
  <Col md="12" className="d-flex flex-column" >
    <Button color="default" href="/agencyAdmin" >Tus publicaciones</Button>
    <Button color="default" href="/agencyInbox" >Bandeja de entrada</Button>
    <Button color="default">Perfil</Button>
    <Button color="default">Micrositio</Button>
    <Button color="primary" href="/createPublication" >Crear publicación</Button>
  </Col>
);

export default AgencyAdmin;
