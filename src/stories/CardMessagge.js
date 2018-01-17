import React from 'react';
import { Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

const CardMessagge = () => (
  <div className="d-flex flex-row card" >
    <img src="http://placecage.com/c/230/150" alt="banner" />
    <div className="info-container">
      <div className="d-flex flex-row justify-content-between" >
        <div className="d-flex flex-column align-items-end" >
          <h6>12/12/2017 12:33</h6>
          <h6><b>Fiat Punto Attractive</b> 1.6, 2016 - 40239km</h6>
          <h4>$ 260000</h4>
        </div>
        <Button type="secondary" href="/inbox" >Responder</Button>
      </div>
    </div>
    <style jsx>{
      `
      .card {
        margin-bottom: 30px;
        padding: 15px;
        background-color: lightgray;
      }
      .info-container {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .underline {
        width: 100%;
        height: 2px;
        background-color: lightgray;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      `
    }
    </style>
  </div>
);

export default CardMessagge;
