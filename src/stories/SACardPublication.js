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
const SACardPublication = ({ onHighlight, data, data: { CurrentState: { stateName } } }) => (
  <div className="box-item" >
    <div className="row item-car wide" >
      <div className="col-4">
        <div className="row">
          <img src={photoGaleryParser(data.ImageGroup)[0].src} alt="banner" width="100%" />
        </div>
      </div>
      <div className="col-8">
        <div className="item-data" >
          <p className="item-state badge badge-secondary published">{stateName}</p>
          <p className="item-name"><strong>{data.User.agencyName === null ? data.User.name : data.User.agencyName}</strong></p>
          <p className="item-description">{data.brand} {data.group}</p>
          <small>{data.modelName}</small>
        </div>
        <div className="d-flex flex-column align-items-end item-visibility" >
          <h6>Publicación {!isPubVisible(stateName) && 'no'} visible</h6>
        </div>
        <div className="item-admin" >
          {stateName !== 'Vendida' && <Button className="btn-default btn-link-primary float-left">Marcar como Vendido</Button>}
          {isPubEditable(stateName) && <Button className="btn-default btn-link-primary float-right">Editar</Button>}
          {isPubVisible(stateName) && stateName !== 'Destacada' && <Button className="btn-default btn-link-primary float-right" onClick={() => onHighlight()} >Destacar</Button>}
          <Button className="btn-default btn-link-primary float-right" onClick={() => onHighlight()} >Ver Publicación</Button>
          {/* {stateName === 'Vencida' && <Button className="btn-default btn-link-primary float-right" onClick={() => onHighlight()} >Editar Vigencia</Button>} */}
          {stateName === 'Pendiente' && <Button className="btn-default btn-link-primary float-right" onClick={() => onHighlight()} >Desaprobar</Button>}
          {stateName === 'Pendiente' && <Button className="btn-default btn-link-primary float-right" onClick={() => onHighlight()} >Aprobar</Button>}
          <div className="clearfix" />
        </div>
      </div>
    </div>
  </div>
);

export default SACardPublication;
