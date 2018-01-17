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
    <style jsx>{`
  /* Add a black background color to the top navigation */
  .TopTopNav{
    background-color: lightgray;
    overflow: hidden;
  }
  
  /* Style the links inside the navigation bar */
  .btn-top-nav {
      float: right;
      color: black;
      text-align: center;
      padding: 2px 16px;
      text-decoration: none;
      background-color: transparent;
  }
  
  /* Change the color of links on hover */
  .btn-top-nav:hover {
      background-color: #ddd;
      color: black;
  }
}
`}
    </style>
  </div>
);
