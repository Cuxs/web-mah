import React from 'react';
import { Col, Row, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

const style = {
  container: {

  },
};

export default () => (
  <Col sm="12">
    <Row className="box" >
      <Col sm="3" xs="12" className="card-plans" >
        <h4>Básica Particular</h4>
        <h6>Una publicación gratis</h6>
        <h6>Tiempo de la publicación: 60 días</h6>
        <h6>Inmediata, sin registro</h6>
        <Button color="primary">Comenzar</Button>
      </Col>
      <Col sm="3" xs="12" className="card-plans">
        <h4>Premium Particular</h4>
        <h6>Publicaciones gratis ilimitadas</h6>
        <h6>Tiempo de publicación: 60 días.</h6>
        <h6>Panel de Control de autos publicados.</h6>
        <h6>Chat con los interesados</h6>
        <h6>Anuncios destacados ilimitados</h6>
        <h6>Publicaciones en redes sociales y fan page de miautohoy.com</h6>
        <Button color="primary">Comenzar</Button>
      </Col>
      <Col sm="3" xs="12" className="card-plans">
        <h4>Premium Concesioanria</h4>
        <h6>Publicaciones gratis ilimitadas</h6>
        <h6>Tiempo de publicación: 60 días.</h6>
        <h6>Posibilidad de compra garantizada si transcurridos los 60 días no vendió su auto.</h6>
        <h6>Panel de Control de autos publicados.</h6>
        <h6>Chat con los interesados</h6>
        <h6>Anuncios destacados ilimitados</h6>
        <h6>Minisitio Consecionario</h6>
        <h6>Publicaciones en redes sociales y fan page de miautohoy.com</h6>
        <Button color="primary">Comenzar</Button>
      </Col>
      <style jsx>
        {`
          .card-plans {
            border-radius: 3px;
            background-color: white;
            padding: 20px;
            margin: 10px;
          }
          .box {
            background-color: lightgray;
            display: flex;
            justify-content: space-around;
          }
        `}
      </style>
    </Row>
  </Col>
);

