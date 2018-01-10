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
        <Button color="link">Modificar datos</Button>

        <h6>PASO 2</h6>
        <h4><b>Dejá tus datos de contacto para recibir mensajes de los interesados</b></h4>

      </Col>
      <Col md="4">
        <h4>Datos personales</h4>
        <FormGroup>
          <Label for="exampleEmail">Nombre y Apellido</Label>
          <Input type="text" name="name" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">DNI</Label>
          <Input type="numeric" name="dni" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Domicilio</Label>
          <Input type="string" name="address" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Ingresos</Label>
          <Input type="numeric" name="dni" id="exampleEmail" placeholder="Ingrese un número sin puntos ni comas" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Monto a financiar</Label>
          <Input type="numeric" name="dni" id="exampleEmail" placeholder="Ingrese un número sin puntos ni comas" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Ocupación</Label>
          <Input type="string" name="job" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Teléfono</Label>
          <Input type="numeric" name="phone" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Mensaje</Label>
          <Input type="textarea" name="text" id="exampleText" placeholder="Ingresa tu consulta" />
        </FormGroup>
        <Button color="primary"> Solicitá</Button>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default PersonalShopper;
