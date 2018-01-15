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
    (<Col sm="3" xs="12" style={style.item} >
      {row}
    </Col>
    ));


  return (
    <div style={style.container}>
      <h3>Empresas Amigas</h3>
      <Row >
        {item}
      </Row>
    </div>);
};
