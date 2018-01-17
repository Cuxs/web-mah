import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

const CardAgency = () => (
  <div className="d-flex flex-row card" >
    <img src="http://placecage.com/c/230/150" alt="banner" />
    <div className="d-flex flex-column">
      <h4>Nombre de la Agencia</h4>
      <h6>DOMICILIO</h6>
      <h5>Av. Mitre 1468/ Av. Mitre 1719 San Rafael, Mendoza</h5>
      <h6>TELÉFONO</h6>
      <h5>2604-4337724/ 2604-329383</h5>
      <h6>EMAIL</h6>
      <h5>agencia@hotmail.com</h5>
    </div>
    <style jsx>{
      `
      .card {
        margin-bottom: 30px;
        padding: 15px;
        background-color: lightgray;
      }
      `
    }
    </style>
  </div>
);

export default CardAgency;
