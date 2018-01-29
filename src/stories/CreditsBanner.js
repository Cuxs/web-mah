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
            <img src="/assets/images/icon-home-1.png" srcSet="/assets/images/icon-home-1@2x.svg"  alt="banner" />
          </Col>
          <Col sm="8">
            <h5>Créditos Prendarios </h5>
            <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al</p>
            <Button color="primary"> Consultá</Button>
          </Col>
        </Row>
      </Col>
      <Col sm="4" xs="12">
        <Row className="justify-content-between">
          <Col md="4" className="text-right">
            <img src="/assets/images/icon-home-2.png" srcSet="/assets/images/icon-home-2@2x.svg" alt="banner" />
          </Col>
          <Col md="8">
            <h5>Personal Shopper </h5>
            <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al</p>
            <Button color="primary"> Consultá</Button>
          </Col>
        </Row>
      </Col>
      <Col sm="4" xs="12">
        <Row className="justify-content-between">
          <Col md="4" className="text-right">
            <img src="/assets/images/icon-home-3.png" srcSet="/assets/images/icon-home-3@2x.svg" alt="banner" />
          </Col>
          <Col md="8">
            <h5>Créditos de libre destino</h5>
            <p>tur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al</p>
            <Button color="primary"> Consultá</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

