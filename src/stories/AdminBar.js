import React from 'react';
import { Col, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import style from '../Styles/search';
import { getUserDataFromToken, clearSession } from '../Modules/sessionFunctions';

/* eslint react/jsx-filename-extension: 0 */

export default class AdminBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="header justify-content-between">
          <Col md="3">
            <Row>
              <a onClick={() => this.props.history.push('/')} >
                <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
              </a>
            </Row>
          </Col>
          <Col md="2" sm="3" xs="6">
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="float-right" style={{width:`auto`}}>
              <DropdownToggle caret className="float-right btn-link" style={{paddingRight:`20px`}}>
                {getUserDataFromToken().name}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => { clearSession(); this.props.history.push('/'); }} >Cerrar Sesión</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
        </Row>
      </div>
    );
  }
}
