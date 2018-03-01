import React from 'react';
import { Col, Row, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

const style = {
  container: {
    padding: '15px',
    paddingLeft: '45px',
    paddingRight: '45px',
  },
  containerCredit: {
    display: 'flex',
    flexDirection: 'row',
  },
  imgCredit: {
    borderRadius: '40px',
  },
};

export default () => (
  <div className="container">
    <Row className="home-posibilities">
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col sm="4" className="text-right">
            <img src="/assets/images/icon-landing-1.svg" alt="banner" />
          </Col>
          <Col sm="8">
            <h5>Gratis e ilimitado</h5>
            <p>Podes crear todas las publicaciones que desees de manera gratuita y sin limitaciones.</p>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col md="4" className="text-right">
            <img src="/assets/images/icon-landing-2.svg" alt="banner" />
          </Col>
          <Col md="8">
            <h5>Panel administrativo</h5>
            <p>Podés controlar todas tus publicaciones desde un panel de control</p>
          </Col>
        </Row>
      </Col>
      <Col md="4" sm="12" xs="12">
        <Row className="justify-content-between">
          <Col md="4" className="text-right">
            <img src="/assets/images/icon-landing-3.svg" alt="banner" />
          </Col>
          <Col md="8">
            <h5>Minisitio</h5>
            <p>Creá un espacio único para tu concesionaria y gestioná todas tus publicaciones.</p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

