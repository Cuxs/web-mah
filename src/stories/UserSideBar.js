import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';
import { getUserDataFromToken } from '../Modules/sessionFunctions';
/* eslint react/jsx-filename-extension: 0 */

class UserSideBar extends Component{
  constructor(props){
    super(props);
    this.state={
     sidebar: ''
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle(){
    this.setState({sidebar: this.state.sidebar === '' ? 'active' : ''})
  }
render(){
  const { history, location } = this.props
return(
  <Row className="sidebar-user" >
    <Button color="primary" onClick={this.toggle} className={`btn-link d-block d-lg-none float-left ${this.state.sidebar}`} >
      <img src="/assets/images/icon-menu.svg" alt="icon-menu" /> Menu
    </Button>
    <ul className={`sidebar-mobile d-none d-xl-block ${this.state.sidebar}`}>
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
}
}

export default UserSideBar;
