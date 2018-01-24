/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';

import style from '../../Styles/register';

class StepFour extends React.Component {
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
            <Button color="link" >Modificar datos</Button>
    
            <div className="underline" />
    
            <Button color="primary" onClick={() => this.toggle()} >Publicar</Button>
    
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
          <ModalBody>
            Tu auto se ha publicado correctamente.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" href="/" >OK</Button>
          </ModalFooter>
        </Modal>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default StepFour;
