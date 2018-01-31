import React from 'react';
import { Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div className="container-fluid">
    <Row className="banner-home" style={{background: `url(http://placecage.com/c/1440/330) no-repeat center center`}}>
      <div className="container">
        <Row className="align-items-center justify-content-between">
          <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
            <h3>Cambia la forma de comprar o vender tu auto</h3>
          </div>
        </Row>
      </div>
    </Row>
  </div>
);

