import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import style from '../Styles/search';
/* eslint react/jsx-filename-extension: 0 */

export default ({ onlyLogin, history }) => (
  <div className="container-fluid">
    <Row className="header">
      <Col md="3">
        <Row>
          <a onClick={() => this.props.history.push('/')} >
            <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
          </a>
        </Row>
      </Col>
      <Col md="9">
        <div className="row justify-content-end">
          { !onlyLogin &&
            <div className="col-10">
              <div className="row justify-content-end">
                <Button color="secondary" className="btn-link">BENEFICIOS</Button>
                <Button color="secondary" className="btn-link">PLANES</Button>
                <Button color="secondary" className="btn-link">AYUDA</Button>
              </div>
            </div>
          }
          <div className="col-2">
            <Button color="secondary" className="btn-link">INICIAR SESIÓN</Button>
          </div>
        </div>
      </Col>
    </Row>
  </div>
);
