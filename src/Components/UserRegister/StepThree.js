/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

import RegisterBar from '../../stories/RegisterBar';
import style from '../../Styles/register';

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  
  render() {
    return (
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
    
            <Button color="primary" onClick={() => this.toggle()} > Registrarme</Button>
          </Col>
        </Row>
        <style jsx>{style}</style>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
          <ModalBody>
            Tu cuenta ha sido creada con éxito.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" href="/userAdmin" >OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default StepThree;
