import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


export default ({ children }) => {
  const item = children.map(row =>
    (<Col sm="3" xs="12" className="box-item" >
      {row}
    </Col>
    ));


  return (
    <div className="container-fluid">
      <Row className="container-box-item">
        <Col md="12">
          <h3 className="title-division">Destacados de la semana</h3>
        </Col>
      </Row>
      <Row className="container-box-item">
        {item}
      </Row>
    </div>);
};
