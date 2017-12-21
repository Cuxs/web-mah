import React from 'react';
import { Col } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <Col md={{ size: 4, offset: 8 }} sm={{ size: 4, offset: 8 }} lg={{ size: 4, offset: 8 }}>
    <p className="publicityBanner">Comprá tu auto aquí y te financiamos hasta el 60%. <a href="/form">Ver más</a> </p>
    <style jsx>
      {
      `
      .publicityBanner{
      }
      `
    }
    </style>
  </Col>
);

