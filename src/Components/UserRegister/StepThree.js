/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button } from 'reactstrap';

import RegisterBar from '../../stories/RegisterBar';
import style from '../../Styles/register';

const StepThree = ({ data }) => (
  <div>
    <RegisterBar onlyLogin />
    <Row>
      <Col md="6" sm="12">
        <h4>Creá tu cuenta como Particular!</h4>
        <h6>Registrate en muy pocos pasos</h6>

        <h6>PASO 1</h6>
        <h4><b>Crear tu cuenta</b></h4>
        <Button color="link">Modificar datos</Button>

        <div className="underline" />

        <h6>PASO 2</h6>
        <h4><b>Contanos sobre tu concessionaria</b></h4>
        <Button color="link">Modificar datos</Button>

        <div className="underline" />

        <h6>Al registrarme, declaro ser mayor de 18 años de edad y acepta los Términos y condiciones de miautohoy.com</h6>

        <Button color="primary"> Registrarme</Button>
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default StepThree;
