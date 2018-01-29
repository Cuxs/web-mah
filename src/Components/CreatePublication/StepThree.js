/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';


import style from '../../Styles/register';


const CreatePublication = () => (
  <div>
    <AdminBar />
    <div className="container-fluid register-steps">
      <Row>
        <Col md="6" sm="12" className="bg">
          <div className="col-md-8 float-right">
            <div className="text-block">
              <h4 className="title-division-primary">Vendé tu auto ya!</h4>
              <p>En muy simples pasos podés publicar tu auto.</p>
            </div>

            <div className="steps">
              <div className="step done">
                <h6>PASO 1</h6>
                <h4>Contanos de tu auto</h4>
                <a className="link">Modificar datos</a>
              </div>

              <div className="step done">
                <h6>PASO 2</h6>
                <h4>Mostralo con fotos</h4>
                <a className="link">Modificar datos</a>
              </div>
            </div>
          </div>
        </Col>

        <Col md="6">
          <div className="col-md-9 float-left">
            <h4 className="title-division">xxx</h4>
            <p>xxx</p>
            <div className="underline" />
            <Button color="primary" href="" >PUBLICAR</Button>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);


export default CreatePublication;
