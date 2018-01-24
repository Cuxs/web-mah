import React from 'react';
import { Button } from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */


export default ({ history }) => (
  <div>
    <div className="TopTopNav" id="myTopnav">
      <Button className="btn-top-nav" onClick={() => history.push('/freeDestinationCredits')}>Créditos Libre Destino</Button>
      <Button className="btn-top-nav" onClick={() => history.push('/personalShopperS1')}>Personal Shopper</Button>
      <Button className="btn-top-nav" onClick={() => history.push('/pledgeCredits')}>Creditos Prendarios</Button>
    </div>
  </div>
);
