/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';

import SearchBar from '../../stories/SearchBar';

import style from '../../Styles/pledgeCredits';


const PersonalShopper = ({ data }) => (
  <div>
    <SearchBar />
    <Row>
      <Col md="6" sm="12" className="container-section">
        <h4>¿Cansado de buscar?</h4>
        <h6>En simples pasos contanos lo que buscás y nosotros lo buscamos por vos.</h6>

        <h6>PASO 1</h6>
        <h4><b>Contanos lo que buscás</b></h4>

        <h6>PASO 2</h6>
        <h4><b>Dejá tus datos de contacto para recibir mensajes de los interesados</b></h4>

      </Col>
      <Col md="4">
        <h4>Datos del auto que comprarías</h4>
        <FormGroup>
          <Label for="exampleEmail">Cantidad de kilómetros</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>Selecciona una opción</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Año</Label>
          <Input type="numeric" name="year" id="exampleEmail" placeholder="Mínimo 4 caracteres" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Precio aproximado</Label>
          <Input type="string" name="address" id="exampleEmail" placeholder="Ingrese un número sin puntos ni comas" />
        </FormGroup>
        <div className="simulator-container">
          <FormGroup>
            <Label for="exampleEmail">Marca del auto que quiero comprar</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>Selecciona una marca</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Modelo del auto que quiero comprar</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>Selecciona una modelo</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <Button color="secondary"> Añadir otro</Button>
        </div>
        <FormGroup>
          <Label for="exampleText">Descripción</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <Button color="primary" href="/personalShopperS2"> Siguiente</Button>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default PersonalShopper;
