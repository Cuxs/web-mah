import React from 'react';
import { Col, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import style from '../Styles/search';
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
      <Row style={style.header} >
        <Col md="6">
          <Button onClick={() => this.props.history.push('/')} >
            <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
          </Button>
        </Col>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Automotores Manzur
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Row>
    );
  }
}
