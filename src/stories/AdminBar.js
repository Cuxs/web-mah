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
      dropdownUser: false,
    };
  }

  toggle() {
    this.setState({
      dropdownUser: !this.state.dropdownUser,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="header justify-content-between">
          <Col md="3">
            <Row>
              <a className="brand" onClick={() => this.props.history.push('/')} >
                <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
              </a>
            </Row>
          </Col>
          <Col md="2" sm="3" xs="6">
            <div>
              <ButtonDropdown
                isOpen={this.state.dropdownUser}
                toggle={this.toggle}
                className="float-right"
                style={{ width: 'auto' }}
              >
                <DropdownToggle caret className="btn-link-active btn-block">{getUserDataFromToken().name}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    value="myAccount"
                    onClick={() => (this.props.history.push('/userAdmin'))}
                  >Mi cuenta
                  </DropdownItem>
                  <DropdownItem value="closeSession" onClick={() => { clearSession(); this.setState({ isUserLogged: false }); this.props.history.push('/'); }}>Cerrar Sesión</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </Col>
        </Row>
      </div>

    );
  }
}
