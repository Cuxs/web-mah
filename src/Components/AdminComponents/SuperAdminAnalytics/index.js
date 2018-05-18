/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row } from 'reactstrap';
import Iframe from 'react-iframe';

import AdminBar from '../../../stories/AdminBar';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';

export default ({ location, history }) => (
  <div>
    <AdminBar history={history} />
    <div className="container-fluid">
      <Row>
        <Col lg="3" md="12" >
          <SuperAdminSideBar history={history} location={location} />
        </Col>
        <Col lg="9" md="12" >
          <Iframe
            url="https://analytics.google.com/analytics/web/?hl=es#&report-home&a96523192w142206756p146770504&embedded=true"
            width="100%"
            height="450px"
            id="myId"
            display="initial"
            position="relative"
            target="_parent"
            allowFullScreen
          />
        </Col>
      </Row>
    </div>
  </div>
);
