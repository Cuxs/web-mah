import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const AgencyAdmin = ({ history }) => (
  <Col md="12" className="d-flex flex-column" >
    <Button color="default" onClick={() => history.push('/agencyAdmin')} >Inicio</Button>
    <Button color="default" onClick={() => history.push('/agencyPublications')} >Tus publicaciones</Button>
    <Button color="default" onClick={() => history.push('/agencyInbox')} >Bandeja de entrada</Button>
    <Button color="default" onClick={() => history.push('/agencyProfile')} >Perfil</Button>
    <Button color="default" onClick={() => history.push('/agencyMicrosite')} >Micrositio</Button>
    <Button color="primary" onClick={() => history.push('/createPublication')} >Crear publicación</Button>
  </Col>
);

export default AgencyAdmin;
