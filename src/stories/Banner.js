import React from 'react';
import { Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Row>
    <div className="col-md-12" >
      <img src="http://placecage.com/c/1440/330" alt="banner" />
      <h3 style={{
          fontSize: '30px',
          position: 'absolute',
          top: '120px',
          left: '18px',
          width: '420px',
          color: 'white',
        }}
      >
        Cambia la forma de comprar o vender tu auto
      </h3>
    </div>
  </Row>
);

