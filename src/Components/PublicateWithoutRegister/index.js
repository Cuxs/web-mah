/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';

import style from '../../Styles/register';


const CreatePublication = ({ history }) => (
  <div>
    <AdminBar history={history} />
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

              <div className="step disable">
                <h6>PASO 3</h6>
                <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                <a className="link">Modificar datos</a>
              </div>
            </div>
          </div>
        </Col>

        <Col md="6" sm="12" xs="12" className="mb-4">
          <div className="col-md-9 float-left">
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

            <div className="underline" />
            <Button color="primary" className="float-right" href="/publicateWithoutRegisterS1" >Siguiente</Button>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default CreatePublication;
