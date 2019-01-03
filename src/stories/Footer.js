import React from 'react';
import { Row, Button } from 'reactstrap';
import ReactGA from 'react-ga';

/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => (
  <footer className="footer">
    <div className="container">
      <Row className="justify-content-center">
        <div className="col-lg-3 col-md-12 m-12" >
          <h4>MI AUTO HOY</h4>
          <p>Mendoza, Argentina</p>
          <Button className="btn btn-footerTerms" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Términos y condiciones' }); history.push('/termsAndConditions'); }}>Términos y Condiciones</Button><br />
          <a href="http://qr.afip.gob.ar/?qr=eCGBIpBl8zeUdl_BL8Pnfw,," target="_F960AFIPInfo"><img style={{ width: '40px' }} alt="Afip" src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg" /></a>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12" >
          <ul>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Buscar nuevos' }); history.push('/SearchCars?text=&carState=Nuevo'); }}>Nuevos</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Buscar usados' }); history.push('/SearchCars?text=&carState=Usado'); }}>Usados</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Concesionarias' }); history.push('/friendlyAgency'); }}>Concesionarias</Button></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12" >
          <ul>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Créditos Prendarios' }); history.push('/pledgeCredits'); }}>Créditos prendarios</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Personal Shopper' }); history.push('/personalShopperS1'); }}>Personal Shopper</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Créditos libre destino' }); history.push('/freeDestinationCredits'); }}>Créditos libre destino</Button></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12" >
          <ul>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Registro Agencia' }); history.push('/agencyRegisterS1'); }}>Adherí tu Concesionario</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Publicá ya' }); history.push('/publicateWithoutRegister'); }}>Publicá gratis ya</Button></li>
            <li><Button className="btn btn-footer" color="link" onClick={() => { ReactGA.event({ category: 'Footer', action: 'Ir a Registro Usuario' }); history.push('/userRegisterS1'); }}>Registrate y publicá</Button></li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 m-12" >
          <ul>
            <li><a className="btn a-footer" href="mailto:contacto@miautohoy.com">contacto@miautohoy.com</a></li>
            <li><a className="btn a-footer" href="tel:02604420324">Tel. (0260) – 4420324</a></li>
            <li><a href="https://www.facebook.com/miautohoycom/" className="btn a-footer" target="_blank">Seguinos en Facebook</a></li>
          </ul>
        </div>
        <div className="col-md-12 text-center">
          <hr />
          <p>© Copyright 2017/2018 - Todos los derechos reservados.</p>
        </div>
      </Row>
    </div>
  </footer>
);

