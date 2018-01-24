import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import style from '../Styles/search';
/* eslint react/jsx-filename-extension: 0 */

export default ({ onlyLogin, history }) => (
  <Row style={style.header} >
    <Col md="6">
      <Button onClick={() => history.push('/')} >
        <img style={{ width: '150px' }} src="/logo.png" alt="Logo" />
      </Button>
    </Col>
    <Col md="6" className="flex-row" >
      { !onlyLogin &&
        <div>
          <Button color="secondary">BENEFICIOS</Button>
          <Button color="secondary">PLANES</Button>
          <Button color="secondary">AYUDA</Button>
        </div>
      }
      <Button color="secondary">INICIAR SESIÓN</Button>
    </Col>
  </Row>
);
