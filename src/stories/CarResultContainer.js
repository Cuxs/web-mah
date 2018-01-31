import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ children }) => {
  const item = children.map(row =>
    (<Col lg="4" md="4" sm="6" xs="12" className="box-item">
      {row}
     </Col>
    ));


  return (
    <div className="">
      <Row className="container-box-item">
        {item}
      </Row>
    </div>);
};
