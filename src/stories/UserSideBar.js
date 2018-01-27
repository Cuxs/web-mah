import React from 'react';
import { Col, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const UserSideBar = ({ history, location }) => (
  <Col md="12" className="sidebar-user" >
    <ul>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userAdmin' ? 'active' : ''} onClick={() => history.push('/userAdmin')} >Inicio</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userPublications' ? 'active' : ''} onClick={() => history.push('/userPublications')} >Tus publicaciones</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userInbox' ? 'active' : ''} onClick={() => history.push('/userInbox')} >Bandeja de entrada</Button>
      </li>
      <li>
        <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/userProfile' ? 'active' : ''} onClick={() => history.push('/userProfile')} >Perfil</Button>
      </li>
    </ul>
    <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={() => history.push('/createPublication')} >Crear publicación</Button>
  </Col>
);

export default UserSideBar;
