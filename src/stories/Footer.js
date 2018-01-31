import React from 'react';
import { Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default () => (
  <footer className="footer">
    <div className="container">
      <Row className="justify-content-center">
        <div className="col-lg-4 col-md-12" >
          <h4>MI AUTO HOY</h4>
          <p>www.miautohoy.com</p>
          <p>Todos los derechos reservados // Copyright 2015/2016</p>
          <p>Mendoza, Argentina</p>
          <p>info@miautohoy.com // Tel. (0260) - 4420183</p>
          <p>* Términos y Condiciones</p>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12" >
          <ul>
            <li><a href="">Nuevos</a></li>
            <li><a href="">Usados</a></li>
            <li><a href="">Concesionarias</a></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12" >
          <ul>
            <li><a href="">Créditos prendarios</a></li>
            <li><a href="">Personal Shopper</a></li>
            <li><a href="">Créditos libre destino</a></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12" >
          <ul>
            <li><a href="mailto:contacto@miautohoy.com">contacto@miautohoy.com</a></li>
            <li><a href="" tel="(0260) – 4420183">Tel. (0260) – 4420183</a></li>
            <li><a href="" target="_blank">Seguinos en Facebook</a></li>
          </ul>
        </div>
        <div className="col-md-12 text-center">
          <hr />
           <p>© Copyright 2015/2016 - Todos los derechos reservados.</p>
        </div>
      </Row>
    </div>
  </footer>
);

