import React from 'react';
import { Col, Row, Button, ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, } from 'reactstrap';
import style from '../Styles/search';
/* eslint react/jsx-filename-extension: 0 */

export default ({ onlyLogin, history }) => (
  <div className="container-fluid">
    <Row className="header">
      <Col md="3" sm="6" xs="6">
        <Row>
          <a onClick={() => this.props.history.push('/')} >
            <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
          </a>
        </Row>
      </Col>

      <Col md="9" sm="6" xs="6" className="text-right">
        <div className="d-none d-md-block">
        { !onlyLogin &&
          <div className="d-inline-block">
              <Button color="secondary" className="btn-link">BENEFICIOS</Button>
              <Button color="secondary" className="btn-link">PLANES</Button>
              <Button color="secondary" className="btn-link">AYUDA</Button>
          </div>
        }
        <Button color="primary" className="btn-link">INICIAR SESIÓN</Button>
        </div>
        <div className="d-inline-block d-md-none">
          <ButtonDropdown
            isOpen="true"
            toggle="true"
          >
            <DropdownToggle caret color="default" className="btn-link btn-block" style={{width:'100px'}}>
              MENU
            </DropdownToggle>
            <DropdownMenu>
              { !onlyLogin &&
                <div>
                  <DropdownItem
                    value="Beneficios"
                  >
                    Beneficios
                  </DropdownItem>
                  <DropdownItem
                    value="Planes"
                  >
                    Planes
                  </DropdownItem>
                  <DropdownItem
                    value="Ayuda"
                  >
                    Ayuda
                  </DropdownItem>
                  <DropdownItem divider />
                </div>
              }
              <DropdownItem
                value="inisiar sesion"
              >
                Iniciar Sesión
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </Col>
    </Row>
  </div>
);
