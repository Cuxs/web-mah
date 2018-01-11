/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';


import style from '../../Styles/register';


const CreatePublication = () => (
  <div>
    <AdminBar />
    <Row>
      <Col md="6" sm="12">
        <h4>Vendé tu auto ya!</h4>
        <h6>En muy simples pasos podés publicar tu auto.</h6>

        <h6>PASO 1</h6>
        <h4><b>Contanos de tu auto</b></h4>
        <Button color="link" >Modificar datos</Button>

        <div className="underline" />

        <h6>PASO 2</h6>
        <h4><b>Mostralo con fotos</b></h4>
        <Button color="link" >Modificar datos</Button>

      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);


export default CreatePublication;
