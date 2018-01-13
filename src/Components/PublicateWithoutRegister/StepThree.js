/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Label, FormGroup, Input } from 'reactstrap';

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

        <div className="underline" />

        <h6>PASO 3</h6>
        <h4><b>Dejá tus datos de contacto para recibir mensajes de los interesados</b></h4>

        <Row>
          <Col md="6">
            <ul>Publicaciones gratis ilimitadas</ul>
            <ul>Tiempo de publicación: 60 días</ul>
            <ul>Posibilidad de compra garantizada si transcurridos los 60 días no vendió su auto</ul>
            <ul>Panel de Control de autos publicados</ul>
            <ul>Chat con los interesados</ul>
            <ul>Anuncios destacados ilimitados</ul>
            <ul>Publicaciones en redes sociales</ul>
          </Col>
          <Col md="6">
            <h6>Para obtener más beneficios, Registrate!</h6>
            <Button color="primary">Registrate con facebook</Button>
            <div className="underline" />
            <p>O con tu email</p>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleText" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Contraseña</Label>
              <Input type="password" name="password" id="exampleText" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Repetir Contraseña</Label>
              <Input type="password" name="password" id="exampleText" />
            </FormGroup>
            <Button color="primary">Registrarme</Button>
          </Col>
        </Row>

      </Col>
      <Col md="4">
        <h4>Solicitá tu crédito!</h4>
        <FormGroup>
          <Label for="exampleEmail">Nombre y Apellido</Label>
          <Input type="string" name="name" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Teléfono</Label>
          <Input type="numeric" name="phone" id="exampleEmail" />
        </FormGroup>
        <div>
          <div className="underline" />
          <Button color="secondary" href="/publicateWithoutRegisterS2">Volver</Button>
          <Button color="primary" href="/publicateWithoutRegisterS4" >Siguiente</Button>
        </div>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);


export default CreatePublication;
