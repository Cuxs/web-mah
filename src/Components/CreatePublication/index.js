/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';

import style from '../../Styles/register';


const CreatePublication = () => (
  <div>
    <AdminBar />
    <div className="container-fluid register-steps">
      <Row>
        <Col md="6" sm="12" xs="12" className="bg">
          <div className="col-md-8 float-right">
            <div className="text-block">
              <h4 className="title-division-primary">Vendé tu auto ya!</h4>
              <p>En muy simples pasos podés publicar tu auto.</p>
            </div>

            <div className="steps">
              <div className="step">
                <h6>PASO 1</h6>
                <h4>Contanos de tu auto</h4>
                <a className="link">Modificar datos</a>
              </div>

              <div className="step disable">
                <h6>PASO 2</h6>
                <h4>Mostralo con fotos</h4>
                <a className="link">Modificar datos</a>
              </div>
            </div>
          </div>
        </Col>
        <Col md="6" sm="12" xs="12">
          <div className="col-md-9 float-left pb-4">
            <h4 className="title-division">Describe tu auto</h4>
            <FormGroup>
              <Label for="exampleSelect">¿Qué tipo de auto quieres vender?</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Usado</option>
                <option>Nuevo</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">¿Cuál es la marca?</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Selecciona una marca</option>
                <option>Fiat</option>
                <option>Renault</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">¿Cuál es el modelo?</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Selecciona un modelo</option>
                <option>Palio</option>
                <option>Punto</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">¿Cuántos kilometros tiene?</Label>
              <Input type="numeric" name="dni" id="exampleEmail" placeholder="Ingrese un número sin puntos ni comas" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">¿A qué precio lo querés vender?</Label>
              <Input type="numeric" name="dni" id="exampleEmail" placeholder="Ingrese un número sin puntos ni comas" />
            </FormGroup>
            <div>
              <div className="underline" />
              <Button color="primary" className="col-6 float-right" href="/createPublicationS1" >Siguiente</Button>
            </div>
          </div>




        </Col>
      </Row>
    </div>
  </div>
);

export default CreatePublication;
