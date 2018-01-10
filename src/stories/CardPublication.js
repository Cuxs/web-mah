import React from 'react';
import { Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

const CardPublication = ({ onHighlight }) => (
  <div className="d-flex flex-row card" >
    <img src="http://placecage.com/c/230/150" alt="banner" />
    <div className="info-container">
      <div className="d-flex flex-row justify-content-between" >
        <h4>Fiat Palio Weekend</h4>
        <h4>Publicado</h4>
      </div>
      <h5>1.8 Adventure Locker Pack Xtreme</h5>
      <h4>$260.000</h4>
      <h5>2014 - 42018km</h5>
      <div className="d-flex flex-column align-items-end" >
        <h6>Publicación visible</h6>
        <h6>hasta el 30/02/2018</h6>
      </div>
      <div className="underline" />
      <div className="d-flex flex-row justify-content-between" >
        <Button>Marcar como Vendido</Button>
        <div>
          <Button type="secondary" onClick={() => onHighlight()} >Destacar</Button>
          <Button type="secondary">Editar</Button>

        </div>
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

export default CardPublication;
