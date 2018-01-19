import React from 'react';
import { Button } from 'reactstrap';

import photoGaleryParser from '../Modules/photoGaleryParser';
import { thousands } from '../Modules/functions';

/* eslint react/jsx-filename-extension: 0 */
const isPubVisible = (stateName) => {
  if (stateName === 'Publicada' || stateName === 'Destacada' || stateName === 'Vendida' || stateName === 'Apto para garantía') {
    return true;
  }
  return false;
};
const isPubEditable = (stateName) => {
  if (stateName === 'Publicada' || stateName === 'Destacada' || stateName === 'Apto para garantía') {
    return true;
  }
  return false;
};
const CardPublication = ({ onHighlight, data, data: { CurrentState: { stateName } } }) => (
  <div className="d-flex flex-row card" >
    <img src={photoGaleryParser(data.ImageGroup)[0].src} alt="banner" />
    <div className="info-container">
      <div className="d-flex flex-row justify-content-between" >
        <h4>{data.brand} {data.group}</h4>
        <h4>{stateName}</h4>
      </div>
      <h5>{data.model}</h5>
      <h4>${thousands(data.price, 2, ',', '.')}</h4>
      <h5>{data.year} - {thousands(data.kms, 0, ',', '.')}km</h5>
      <div className="d-flex flex-column align-items-end" >
        <h6>Publicación {!isPubVisible(stateName) && 'no'} visible</h6>
      </div>
      <div className="underline" />
      <div className="d-flex flex-row justify-content-between" >
        {stateName !== 'Vendida' && <Button>Marcar como Vendido</Button>}
        <div>
          {isPubVisible(stateName) && stateName !== 'Destacada' && <Button type="secondary" onClick={() => onHighlight()} >Destacar</Button>}
          {isPubEditable(stateName) && <Button type="secondary">Editar</Button>}

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
