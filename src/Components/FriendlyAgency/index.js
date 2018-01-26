/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Button } from 'reactstrap';

import TopTopNav from '../../stories/TopTopNav';
import SearchBar from '../../stories/SearchBar';
import PublicityBanner from '../../stories/PublicityBanner';
import CardAgency from '../../stories/CardAgency';
import Footer from '../../stories/Footer';

const FriendlyAgency = ({ history, location }) => (
  <div>
    <div>
      <TopTopNav />
      <SearchBar
        history={history}
        location={location}
      />
      <div className="container-fluid">
        <Row className="mb-4 mt-4">
          <Col md="8" sm="12" />
          <Col md="4" sm="12">
            <PublicityBanner />
          </Col>
        </Row>
        <Row>
          <Col md="4" sm="12">
            <h3 className="title-division">Concesionarios adheridos</h3>
          </Col>
        </Row>
        <Row>
          <Col md="8" className="container-data-input-group">
            <CardAgency />
            <CardAgency />
            <CardAgency />
            <CardAgency />
            <CardAgency />
          </Col>
          <Col md="3">
            <h5 className="title-division-primary">Adherí tu compañía, <br /> es muy fácil.</h5>
            <p>Publicaciones gratis ilimitadas.</p>
            <div className="cont-form">
              <h5><strong>¡Registrate gratis y empezá a vender ahora!</strong></h5>
              <FormGroup>
                <Input type="text" name="agencyName" placeholder="Nombre de la Consecionaria" />
              </FormGroup>
              <FormGroup>
                <Input type="email" name="email" placeholder="Email" />
              </FormGroup>
              <Button color="primary" className="btn-block" href="/agencyRegisterS1" >Comenzar</Button>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  </div>
);

export default FriendlyAgency;
