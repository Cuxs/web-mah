import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const SuperAdminsideBar = ({ history, location }) => (
  <Col md="12" className="sidebar-user" >
    <ul>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminPublications' ? 'active' : ''} onClick={() => history.push('/superAdminPublications')} >Publicaciones</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminInbox' ? 'active' : ''} onClick={() => history.push('/superAdminInbox')} >Mensajes</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/superAdminUsers' ? 'active' : ''} onClick={() => history.push('/superAdminUsers')} >Usuarios</Button>
      </li>
    </ul>
    <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={() => history.push('/createPublication')} >Crear publicación</Button>
  </Col>
);

export default SuperAdminsideBar;
