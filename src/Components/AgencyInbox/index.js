/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import AdminSideBar from '../../stories/AdminSideBar';
import AdminFilter from '../../stories/AdminFilter';
import CardMessagge from '../../stories/CardMessagge';

import style from '../../Styles/pledgeCredits';


const AgencyInbox = ({ history, location }) => (
  <div>
    <AdminBar history={history} />

    <Row>
      <Col md="3">
        <AdminSideBar history={history} location={location} />
      </Col>
      <Col md="9">
        <AdminFilter />
        <CardMessagge />
        <CardMessagge />
        <CardMessagge />
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default AgencyInbox;
