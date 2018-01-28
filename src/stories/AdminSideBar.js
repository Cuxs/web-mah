import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const AgencyAdmin = ({ history, location }) => (
  <Col md="12" className="sidebar-user" >
    <ul>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyAdmin' ? 'active' : ''} onClick={() => history.push('/agencyAdmin')} >Inicio</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyPublications' ? 'active' : ''} onClick={() => history.push('/agencyPublications')} >Tus publicaciones</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyInbox' ? 'active' : ''} onClick={() => history.push('/agencyInbox')} >Bandeja de entrada</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyProfile' ? 'active' : ''} onClick={() => history.push('/agencyProfile')} >Perfil</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyMicrosite' ? 'active' : ''} onClick={() => history.push('/agencyMicrosite')} >Micrositio</Button>
      </li>
    </ul>
    <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={() => history.push('/createPublication')} >Crear publicación</Button>
  </Col>
);

export default AgencyAdmin;
