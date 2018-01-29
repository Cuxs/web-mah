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
  <div className="container-fluid">
    <Row className="home-posibilities">
      <Col sm="4" xs="12">
        <Row className="justify-content-between">
          <Col sm="4" className="text-right">
            <img src="/assets/images/icon-landing-1.svg"  alt="banner" />
          </Col>
          <Col sm="8">
            <h5>Publicación gratis</h5>
            <p>Podes crear una publicación rápido y fácil.</p>
          </Col>
        </Row>
      </Col>
      <Col sm="4" xs="12">
        <Row className="justify-content-between">
          <Col md="4" className="text-right">
            <img src="/assets/images/icon-landing-2.svg" alt="banner" />
          </Col>
          <Col md="8">
            <h5>Inmediata</h5>
            <p>Podés publicar tu auto de manera inmediata sin necesidad de registrarte.</p>
          </Col>
        </Row>
      </Col>
      <Col sm="4" xs="12">
        <Row className="justify-content-between">
          <Col md="4" className="text-right">
            <img src="/assets/images/icon-landing-3.svg" alt="banner" />
          </Col>
          <Col md="8">
            <h5>60 días</h5>
            <p>Tu anuncio estará expuesto durante 60 días. Vende fácil y rápido.</p>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

