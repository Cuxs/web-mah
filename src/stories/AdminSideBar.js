import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const AgencyAdmin = ({ history, location }) => (
  <Col md="12" className="d-flex flex-column" >
    <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyAdmin' ? 'active' : ''} onClick={() => history.push('/agencyAdmin')} >Inicio</Button>
    <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyPublications' ? 'active' : ''} onClick={() => history.push('/agencyPublications')} >Tus publicaciones</Button>
    <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyInbox' ? 'active' : ''} onClick={() => history.push('/agencyInbox')} >Bandeja de entrada</Button>
    <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyProfile' ? 'active' : ''} onClick={() => history.push('/agencyProfile')} >Perfil</Button>
    <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyMicrosite' ? 'active' : ''} onClick={() => history.push('/agencyMicrosite')} >Micrositio</Button>
    <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={() => history.push('/createPublication')} >Crear publicación</Button>
  </Col>
);

export default AgencyAdmin;
