import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <div>
    <div className="TopTopNav" id="myTopnav">
      <a href="#about">Créditos Libre Destino</a>
      <a href="/personalShopperS1">Personal Shopper</a>
      <a href="/pledgeCredits">Creditos Prendarios</a>
    </div>
    <style jsx>{`
  /* Add a black background color to the top navigation */
  .TopTopNav{
    background-color: lightgray;
    overflow: hidden;
  }
  
  /* Style the links inside the navigation bar */
  .TopTopNav a {
      float: right;
      color: black;
      text-align: center;
      padding: 2px 16px;
      text-decoration: none;
  }
  
  /* Change the color of links on hover */
  .TopTopNav a:hover {
      background-color: #ddd;
      color: black;
  }
}
`}
    </style>
  </div>
);
