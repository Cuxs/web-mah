import React from 'react';
import { Col, Button, Row } from 'reactstrap';
import { getUserDataFromToken } from '../Modules/sessionFunctions';
/* eslint react/jsx-filename-extension: 0 */

const UserSideBar = ({ history, location }) => (
  <Row className="sidebar-user" >
    <Button color="primary" className="btn-link d-block d-lg-none float-left" >
      <img src="/assets/images/icon-menu.svg" /> Menu
    </Button>
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
      <li>
        {getUserDataFromToken().userType === 'Agencia' && <Button style={{ cursor: 'pointer' }} color="default" className={location.pathname === '/agencyMicrosite' ? 'active' : ''} onClick={() => history.push('/agencyMicrosite')} >Micrositio</Button>}
      </li>
    </ul>
    <Button style={{ cursor: 'pointer' }} color="primary" className={location.pathname === '/createPublication' ? 'active' : ''} onClick={() => history.push('/createPublication')} >Crear publicación</Button>
  </Row>
);

export default UserSideBar;
