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
        <h4>¿Qué extrass tiene?</h4>
        <FormGroup check className="d-flex flex-column" >
          <Label>Confort</Label>

          <Label check>
            <Input type="checkbox" />{' '} Aire Acondicionado
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Alarma
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Asiento rebatible
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Cierre centralizado
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Tapizado de cuero
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Velocidad crucero
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Volante regulable
          </Label>
        </FormGroup>

        <FormGroup check className="d-flex flex-column" >
          <Label>Seguridad</Label>

          <Label check>
            <Input type="checkbox" />{' '} Airbag
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Cierre automático
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Control de estabilidad
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Faros antiniebla
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Frenos ABS
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Sensor de estacionamiento
          </Label>
        </FormGroup>

        <FormGroup check className="d-flex flex-column" >
          <Label>Audio/Multimedia</Label>

          <Label check>
            <Input type="checkbox" />{' '} Bluetooth
          </Label>
          <Label check>
            <Input type="checkbox" />{' '} Entrada auxiliar
          </Label>
        </FormGroup>
        <div>
          <div className="underline" />
          <Button color="secondary" href="/publicateWithoutRegister">Volver</Button>
          <Button color="primary" href="/publicateWithoutRegisterS2" >Siguiente</Button>
        </div>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default CreatePublication;
