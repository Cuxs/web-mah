import React from 'react';
import { Button } from 'reactstrap';

import photoGaleryParser from '../Modules/photoGaleryParser';
import { thousands } from '../Modules/functions';

/* eslint react/jsx-filename-extension: 0 */
const isPubVisible = (stateName) => {
  if (
    stateName === 'Publicada' ||
    stateName === 'Destacada' ||
    stateName === 'Vendida' ||
    stateName === 'Apto para garantía'
  ) {
    return true;
  }
  return false;
};
const pubStateClass = (stateName) => {
  switch (stateName) {
    case 'Publicada': return 'published';
    case 'Vendida': return 'sold';
    case 'Destacada': return 'highlighted';
    case 'Pendiente': return 'pending';
    default: return '';
  }
};
const isPubEditable = (stateName) => {
  if (
    stateName === 'Publicada' ||
    stateName === 'Destacada' ||
    stateName === 'Apto para garantía'
  ) {
    return true;
  }
  return false;
};
const CardPublication = ({
  onHighlight,
  data,
  data: { CurrentState: { stateName } },
}) => (
  <div className="box-item" >
    <div className="row item-car wide" >
      <div className="col-12 col-lg-4 col-md-4 col-sm-4">
        <div className="row">
          <img
            src={photoGaleryParser(data.ImageGroup)[0].src}
            alt="banner"
            width="100%"
          />
        </div>
      </div>
      <div className="col-12 col-lg-8 col-md-8 col-sm-8">
        <div className="item-data" >
          <p className={`item-state badge badge-secondary ${pubStateClass(stateName)}`}>{stateName}</p>
          <p className="item-name"><strong>{data.brand} {data.group}</strong></p>
          <p className="item-description">{data.model}</p>
          <p className="item-price">
            <strong>${thousands(data.price, 2, ',', '.')}</strong>
          </p>
          <small>
            {data.year} - {thousands(data.kms, 0, ',', '.')}km
          </small>
        </div>
        <div className="d-flex flex-column align-items-end item-visibility">
          <h6>Publicación {!isPubVisible(stateName) && 'no'} visible</h6>
        </div>
        <div className="item-admin" >
          {stateName !== 'Vendida' && <Button className="btn-default btn-link-primary float-left">Marcar como Vendido</Button>}
          {isPubEditable(stateName) &&
          <Button className="btn-default btn-link-primary float-right">
            <img src="/assets/images/icon-edit-red.svg" alt="E" /> Editar
          </Button>}
          {isPubVisible(stateName) && stateName !== 'Destacada' && stateName !== 'Vendida' &&
          <Button className="btn-default btn-link-primary float-right" onClick={() => onHighlight()} >
            <img src="/assets/images/icon-star-red.svg" alt="D" /> Destacar
          </Button>}
          <div className="clearfix" />
        </div>
      </div>
    </div>
  </div>
);

export default CardPublication;
