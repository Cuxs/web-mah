/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

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

        <div className="underline" />

        <h6>PASO 2</h6>
        <h4>Mostralo con fotos</h4>

        <div className="underline" />
        
        <h6>PASO 3</h6>
        <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>

      </Col>
      <Col md="4">
        <h4>Describe tu auto</h4>
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
        <Button color="primary" href="/publicateWithoutRegisterS1" >Siguiente</Button>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default CreatePublication;
