import React from 'react';
import { Col, Row } from 'reactstrap';
import { stringify } from 'query-string';

/* eslint react/jsx-filename-extension: 0 */

export default ({ history, dataPublication }) => (
  <Col md="12">
    <a onClick={dataPublication ? () => history.push(`/pledgeCredits?${stringify(dataPublication)}`) : () => history.push('/pledgeCredits')}>
      <Row className="publicityBanner align-items-center">
        <div className="col-10">Comprá tu auto aquí y te financiamos hasta el 60%.</div>
        <div className="col-2"><img src="/assets/images/icon-arrow-right.svg" alt="Ir al formulario" /></div>
      </Row>
    </a>
  </Col>
);

