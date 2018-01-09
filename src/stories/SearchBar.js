import React, { Component } from 'react';
import { Input, Col, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import style from '../Styles/search';
/* eslint react/jsx-filename-extension: 0 */

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      carState: 'Usado',
      text: this.props.text === undefined ? '' : this.props.text,
    };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  submitSearch() {
    this.props.history.push(`/SearchCars?text=${this.state.text}&carState=${this.state.carState}`);
  }
  render() {
    return (
      <Row style={style.header} >
        <Col md="6">
          <Row >
            <Col md="3">
              <p >Mi auto Hoy</p>
            </Col>
            <Col md="5">
              <Input type="text" id="search" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }); }} />
            </Col>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.state.carState}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem value="Nuevo" onClick={e => this.setState({ carState: e.target.value })}>Nuevo</DropdownItem>
                <DropdownItem value="Usado" onClick={e => this.setState({ carState: e.target.value })}>Usado</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            <Button style={{ cursor: 'pointer' }} className="icon is-small" onClick={() => { this.submitSearch(); }}>
              <i className="fa fa-search" aria-hidden="true" />
            </Button>
          </Row>

        </Col>
        <Col md="6" className="flex-row-reverse" >
          <Button color="primary"> Solicitá tu crédito</Button>
          <Button color="secondary"> Ver Consecionarias</Button>
          <strong>Publicá gratis</strong> | <a> Iniciá Sesión </a>
        </Col>
        {/*  <Redirect to={{
          pathname: '/SearchCars',
          search: `text=${this.state.text}&carState=${this.state.carState}`,
        />} */}
      </Row>
    );
  }
}
export default SearchBar;
