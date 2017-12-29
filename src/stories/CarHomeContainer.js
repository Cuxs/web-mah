import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ children }) => {
  const item = children.map(row =>
    (<Col lg="3" md="3" sm="3" xs="12">
      {row}
    </Col>
    ));


  return (
    <div>
      <Row>
        {item}
      </Row>
    </div>);
};
