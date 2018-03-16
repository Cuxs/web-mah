import React from 'react';
import { Row, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => (
  <footer className="footer">
    <div className="container">
      <Row className="justify-content-center">
        <div className="col-lg-3 col-md-12" >
          <h4>MI AUTO HOY</h4>
          <p>Mendoza, Argentina</p>
          <Button className="btn btn-footerTerms" color="link" onClick={() => history.push('/termsAndConditions')}>Términos y Condiciones</Button>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12" >
          <ul>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/SearchCars?text=&carState=Nuevo')}>Nuevos</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/SearchCars?text=&carState=Usado')}>Usados</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/friendlyAgency')}>Concesionarias</Button></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12" >
          <ul>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/pledgeCredits')}>Créditos prendarios</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/personalShopperS1')}>Personal Shopper</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/freeDestinationCredits')}>Créditos libre destino</Button></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12" >
          <ul>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/agencyRegisterS1')}>Adherí tu Concesionario</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/publicateWithoutRegister')}>Publicá gratis ya</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => history.push('/userRegisterS1')}>Registrate y publicá</Button></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12" >
          <ul>
            <li><a className="btn a-footer" href="mailto:contacto@miautohoy.com">contacto@miautohoy.com</a></li>
            <li><a className="btn a-footer" href="tel:02604420183">Tel. (0260) – 4420183</a></li>
            <li><a className="btn a-footer" href="" target="_blank">Seguinos en Facebook</a></li>
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

