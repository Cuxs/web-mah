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
      <div className="container-section">
        <Row>
          <Col md="7" sm="12" />
          <Col md="5" sm="12">
            <PublicityBanner />
          </Col>
        </Row>
        <h3>Concesionarios adheridos</h3>
        <Row>
          <Col md="7" >
            <CardAgency />
            <CardAgency />
            <CardAgency />
            <CardAgency />
            <CardAgency />
          </Col>
          <Col md="5" >
            <h5>Adherí tu compañía, es muy fácil.</h5>
            <h6>Publicaciones gratis ilimitadas.</h6>
            <h6>¡Registrate gratis y empezá a vender ahora!</h6>
            <FormGroup>
              <Input type="text" name="agencyName" placeholder="Nombre de la Consecionaria" />
            </FormGroup>
            <FormGroup>
              <Input type="email" name="email" placeholder="Email" />
            </FormGroup>
            <Button color="primary" href="/agencyRegisterS1" >Comenzar</Button>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  </div>
);

export default FriendlyAgency;
