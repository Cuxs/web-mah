/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import AdminSideBar from '../../stories/AdminSideBar';
import AdminFilter from '../../stories/AdminFilter';
import CardPublication from '../../stories/CardPublication';

import style from '../../Styles/pledgeCredits';


const AgencyAdmin = () => (
  <div>
    <AdminBar />

    <Row>
      <Col md="3">
        <AdminSideBar />
      </Col>
      <Col md="9">
        <AdminFilter />
        <CardPublication />
        <CardPublication />
        <CardPublication />
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default AgencyAdmin;
