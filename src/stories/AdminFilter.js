import React from 'react';
import { Col, Button, FormGroup, Input } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */


const AgencyFilter = () => (
  <div className="d-flex flex-row" >
    <h4>Filtrar por</h4>
    <FormGroup>
      <Input type="select" name="select" id="exampleSelect">
        <option>Tipo</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Input>
    </FormGroup>
    <FormGroup>
      <Input type="select" name="select" id="exampleSelect">
        <option>Marca</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Input>
    </FormGroup>
    <h4>Ordenar por</h4>
    <FormGroup>
      <Input type="select" name="select" id="exampleSelect">
        <option>Fecha última publicación</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Input>
    </FormGroup>
  </div>
);

export default AgencyFilter;
