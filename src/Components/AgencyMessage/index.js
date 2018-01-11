/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import LastMessage from '../../stories/LastMessage';
import Message from '../../stories/Message';

import style from '../../Styles/pledgeCredits';

const AgencyMessage = () => (
  <div>
    <AdminBar />

    <Row>
      <Col md="6">
        <Button type="secondary">{'< Volver a Bandeja de Entrada'}</Button>
        <div className="d-flex flex-row">
          <img src="http://placecage.com/c/230/150" alt="banner" />
          <div className="d-flex flex-column">
            <h6>Fiat Palio Weekend</h6>
            <h6>1.8 Adventure Locker Pack</h6>
            <h6>$ 260000</h6>
            <h6>2014 - 42012km</h6>
          </div>
        </div>
      </Col>
      <Col md="6" >
        <LastMessage message={{ author: 'Rodrigo Valles', date: '12/12/2017 20:30', body: 'Hola, quisiera preguntar si recibe Permuta?' }} />
        <Message message={{ author: 'Agencia', date: '12/12/2017 18:30', body: 'Gracias por contactarte' }} />
        <Message message={{ author: 'Agencia', date: '12/12/2017 18:30', body: 'No tiene detalles' }} />
        <Message message={{ author: 'Rodrigo Valles', date: '12/12/2017 11:30', body: 'Hola! estoy interesado, tiene algun detalle?' }} />
      </Col>
    </Row>
    <style jsx>{style}</style>
  </div>
);

export default AgencyMessage;
