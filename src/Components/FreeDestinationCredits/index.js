/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import qs from 'query-string';

import SearchBar from '../../stories/SearchBar';

import style from '../../Styles/pledgeCredits';


const FreeDestinationCredits = ({ history, location }) => (
  <div>
    <SearchBar history={history} location={location} />

    <Row>
      <Col md="6" sm="12" className="container-section">
        <h4>No hace falta que vendas tu auto!</h4>
        <h6>Usalo de garantía, solicitá un préstamo y usa el dinero para lo que vos quieras.</h6>

        <h4>Como?</h4>
        <h6>Completa los datos a continuación y un asesor se pondrá en contacto con vos a la brevedad.</h6>

        <h4>Qué necesitamos?</h4>
        <h6>Sólo con tu DNI.</h6>

      </Col>
      <Col md="4">
        <h4>Solicitá tu crédito!</h4>
        <FormGroup>
          <Label for="exampleEmail">Nombre y Apellido</Label>
          <Input type="string" name="name" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">DNI</Label>
          <Input type="numeric" name="dni" id="exampleEmail" />
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
          <Label for="exampleEmail">Destino del crédito</Label>
          <Input type="string" name="destination" id="exampleEmail" />
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

export default FreeDestinationCredits;
