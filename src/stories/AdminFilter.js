import React, { Component } from 'react';
import { FormGroup, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { parse, stringify } from 'query-string';
/* eslint react/jsx-filename-extension: 0 */

class AdminFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoDropdown: false,
      stateDropdown: false,

      dropDownTipoValue: parse(props.location.search).carState || 'Tipo',
      dropDownPublicationStateValue: parse(props.location.search).stateName || 'Estado de Publicación',
    };
    this.toggleTipoDropdown = this.toggleTipoDropdown.bind(this);
    this.toggleStateDropdown = this.toggleStateDropdown.bind(this);

    this.changeTipoValue = this.changeTipoValue.bind(this);
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
      <div className="d-flex flex-row">
        <h4>Filtrar por</h4>
        <Dropdown size="sm" isOpen={this.state.tipoDropdown} toggle={this.toggleTipoDropdown}>
          <DropdownToggle caret>
            {this.state.dropDownTipoValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Elije una</DropdownItem>
            <DropdownItem onClick={e => this.changeTipoValue(e)}>Usado</DropdownItem>
            <DropdownItem onClick={e => this.changeTipoValue(e)}>Nuevo</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown size="sm" isOpen={this.state.stateDropdown} toggle={this.toggleStateDropdown}>
          <DropdownToggle caret>
            {this.state.dropDownPublicationStateValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Elije una</DropdownItem>
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }}>Pendiente</DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Publicada </DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Destacada </DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Suspendida </DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Vendida </DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Archivada </DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Eliminada </DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Vencida </DropdownItem >
            <DropdownItem onClick={(e) => { this.changeStateValue(e); }} >Apto para garantía </DropdownItem >
          </DropdownMenu>
        </Dropdown>

        {/*   <h4>Ordenar por</h4>
        <Dropdown size="sm" isOpen={this.state.orderByDropdown} toggle={this.toggleOrderDropdown}>
          <DropdownToggle caret>
            {this.state.dropDownOrderByValue}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Elije una</DropdownItem>
            <DropdownItem onClick={e => this.changeOrderValue(e)}>Mas antiguas primero</DropdownItem>
            <DropdownItem onClick={e => this.changeOrderValue(e)}>Mas nuevas primero</DropdownItem>
            <DropdownItem onClick={e => this.changeOrderValue(e)}>Ultimas actualizadas primero</DropdownItem>
            <DropdownItem onClick={e => this.changeOrderValue(e)}>Primeras actualizadas primero</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </div>
    );
  }
}

export default AdminFilter;
