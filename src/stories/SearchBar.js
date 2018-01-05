import React from 'react';
import { Input, Col, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroupAddon, Button } from 'reactstrap';
import style from '../Styles/search';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Row style={style.header} >
    <Col md="6">
      <Row >
        <Col md="3">
          <p >Mi auto Hoy</p>
        </Col>
        <Col md="5">
          <Input type="text" id="search" />
        </Col>
        <ButtonDropdown isOpen={false} toggle={this.toggle}>
          <DropdownToggle caret>
                Usados
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <InputGroupAddon>
          <span className="icon is-small">
            <i className="fa fa-search" aria-hidden="true" />
          </span>
        </InputGroupAddon>
      </Row>

    </Col>
    <Col md="6" className="flex-row-reverse" >
      <Button color="primary"> Solicitá tu crédito</Button>
      <Button color="secondary"> Ver Consecionarias</Button>
      <strong>Publicá gratis</strong> | <a> Iniciá Sesión </a>
    </Col>
  </Row>
);
