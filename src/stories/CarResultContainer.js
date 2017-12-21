import React from 'react';
import { Col, Row } from 'reactstrap';
import CarResult from './CarResult';
import { carSearchResult } from './exampleData/carResultData';
/* eslint react/jsx-filename-extension: 0 */

export default () => {
  const item = carSearchResult.map(row =>
    (
      <Col lg="4" md="4" sm="4" xs="12">
        <CarResult photoGalery={row.photoGalery} data={row.data} {...{ [row.State]: true }} />
      </Col>
    ));
  return (
    <div>
      <Row>
        {item}
      </Row>
    </div>);
};
