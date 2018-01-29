import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

const CardAgency = () => (
  <div className="box-item-horizontal col-md-12" >
    <div className="row" >
      <div className="col-md-4">
        <img src="http://placecage.com/c/230/150" alt="banner" width="100%"/>
      </div>
      <div className="col-md-8">
        <h4><strong>Nombre de la Agencia</strong></h4>
        <div className="data-input-group">
          <label>DOMICILIO</label>
          <p>Av. Mitre 1468/ Av. Mitre 1719 San Rafael, Mendoza</p>
        </div>
        <div className="data-input-group">
          <label>TELÉFONO</label>
          <p>2604-4337724/ 2604-329383</p>
        </div>
        <div className="data-input-group">
          <label>EMAIL</label>
          <p>agencia@hotmail.com</p>
        </div>
      </div>
    </div>
  </div>
);

export default CardAgency;
