import React, { Component } from 'react';
import { FormGroup, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Col, Row } from 'reactstrap';
import { parse, stringify } from 'query-string';
/* eslint react/jsx-filename-extension: 0 */

class SuperAdminFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoDropdown: false,
      stateDropdown: false,

      dropDownTipoValue: parse(props.location.search).carState || 'Tipo',
      dropDownTipoUserValue: parse(props.location.search).userType || 'Tipo de Cliente',
      dropDownPublicationStateValue: parse(props.location.search).stateName || 'Estado de Publicación',
    };
    this.toggleTipoDropdown = this.toggleTipoDropdown.bind(this);
    this.toggleTipoUserDropdown = this.toggleTipoUserDropdown.bind(this);
    this.toggleStateDropdown = this.toggleStateDropdown.bind(this);

    this.changeTipoValue = this.changeTipoValue.bind(this);
    this.changeTipoUserValue = this.changeTipoUserValue.bind(this);
    this.changeStateValue = this.changeStateValue.bind(this);
  }

  searchWithParam(property, value) {
    let searchObj = {};
    const { location, history, location: { pathname } } = this.props;
    searchObj = (parse(location.search));
    searchObj[property] = value;
    history.push(`${pathname}?${stringify(searchObj)}`);
  }

  toggleTipoDropdown() {
    this.setState({
      tipoDropdown: !this.state.tipoDropdown,
    });
  }
  changeTipoValue(e) {
    this.searchWithParam('carState', e.currentTarget.textContent);
    this.setState({ dropDownTipoValue: e.currentTarget.textContent });
  }
  toggleTipoUserDropdown() {
    this.setState({
      tipoUserDropdown: !this.state.tipoUserDropdown,
    });
  }
  changeTipoUserValue(e) {
    this.searchWithParam('userType', e.currentTarget.textContent);
    this.setState({ dropDownTipoUserValue: e.currentTarget.textContent });
  }

  toggleStateDropdown() {
    this.setState({
      stateDropdown: !this.state.stateDropdown,
    });
  }
  changeStateValue(e) {
    this.searchWithParam('stateName', e.currentTarget.textContent);
    this.setState({ dropDownPublicationStateValue: e.currentTarget.textContent });
  }

  render() {
    const { history, location: { pathname, search } } = this.props;
    return (
      <Row className="header-filters align-items-center">
        <Col md="12" sm="12">
          <Row className="align-items-center">
            <div className="col-2 text-right">
              <p>Filtrar por</p>
            </div>
            <div className="col-2">
              <Dropdown size="sm" isOpen={this.state.tipoUserDropdown} toggle={this.toggleTipoUserDropdown}>
                <DropdownToggle caret className="btn-select btn-default">
                  {this.state.dropDownTipoUserValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Elije una</DropdownItem>
                  <DropdownItem onClick={e => this.changeTipoUserValue(e)}>Usuario</DropdownItem>
                  <DropdownItem onClick={e => this.changeTipoUserValue(e)}>Agencia</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="col-2">
              <Dropdown size="sm" isOpen={this.state.tipoDropdown} toggle={this.toggleTipoDropdown}>
                <DropdownToggle caret className="btn-select btn-default">
                  {this.state.dropDownTipoValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Elije una</DropdownItem>
                  <DropdownItem onClick={e => this.changeTipoValue(e)}>Usado</DropdownItem>
                  <DropdownItem onClick={e => this.changeTipoValue(e)}>Nuevo</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="col-2 text-right">
              <p>Ordenar por</p>
            </div>
            <div className="col-4">
              <Dropdown size="sm" isOpen={this.state.stateDropdown} toggle={this.toggleStateDropdown}>
                <DropdownToggle caret className="btn-select btn-default">
                  {this.state.dropDownPublicationStateValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Elije una</DropdownItem>
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }}>Pendiente</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Publicada</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Destacada</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Suspendida</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Vendida</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Archivada</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Eliminada</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Vencida</DropdownItem >
                  <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Apto para garantía</DropdownItem >
                </DropdownMenu>
              </Dropdown>
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SuperAdminFilter;
