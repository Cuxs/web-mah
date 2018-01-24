import React from 'react';
import { Col, Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

const style = {
  container: {
    paddingLeft: '45px',
    paddingRight: '45px',
  },
  item: {
    marginBottom: '30px',
  },
};

export default ({ children }) => {
  const item = children.map(row =>
    (<Col sm="3" xs="12" className="friendly-companies" >
      {row}
    </Col>
    ));


  return (
    <div className="container-fluid">
      <Row className="container-box-item">
        <Col md="12">
          <h3 className="title-division">Empresas amigas</h3>
        </Col>
      </Row>
      <Row className="container-box-item">
        {item}
      </Row>
    </div>);
};