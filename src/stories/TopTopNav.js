import React from 'react';
import { Button, Row } from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */


export default ({ history }) => (
  <div className="container-fluid">
    <Row>
      <div className="TopTopNav" id="myTopnav">
        <a onClick={() => history.push('/freeDestinationCredits')}>Créditos Libre Destino</a>
        <a onClick={() => history.push('/personalShopperS1')}>Personal Shopper</a>
        <a onClick={() => history.push('/pledgeCredits')}>Creditos Prendarios</a>
      </div>
    </Row>
  </div>
);
