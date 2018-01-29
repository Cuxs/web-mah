import React, { Component } from 'react';
import { FormGroup, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Col, Row } from 'reactstrap';
import { parse, stringify } from 'query-string';
/* eslint react/jsx-filename-extension: 0 */

class SuperAdminFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoUserDropdown: false,
      search: '',
      dropDownTipoUserValue: 'Tipo de Cliente',
    };
    this.toggleTipoUserDropdown = this.toggleTipoUserDropdown.bind(this);

    this.changeTipoUserValue = this.changeTipoUserValue.bind(this);
  }

  searchWithParam(property, value) {
    let searchObj = {};
    const { location, history, location: { pathname } } = this.props;
    searchObj = (parse(location.search));
    searchObj[property] = value;
    history.push(`${pathname}?${stringify(searchObj)}`);
  }

  toggleTipoUserDropdown() {
    this.setState({
      tipoUserDropdown: !this.state.tipoUserDropdown,
    });
  }
  changeTipoUserValue(e) {
    this.searchWithParam('carState', e.currentTarget.textContent);
    this.setState({ dropDownTipoUserValue: e.currentTarget.textContent });
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

            <div className="col-6 text-right">
              <Input type="text" value={this.state.search} onChange={event => this.setState({ search: event.target.value })} placeholder="Buscar ..." />
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default SuperAdminFilter;
