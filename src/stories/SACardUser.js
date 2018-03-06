import React from 'react';
import { Col, Row, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */


class CardPublication extends React.Component {
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
    const {
      data,
    } = this.props;
    return (
      <Col md="4">
        <div className="card p-4 box-item box-user" style={{ height: '327px' }}>
          <div>
            <div className="data-input-group">
              <h4>{data.agencyName !== null ? data.agencyName : data.name}</h4>
            </div>
            <div className="data-input-group">
              <Label>EMAIL</Label>
              <p>{data.agencyName !== null ? data.agencyEmail : data.email}</p>
            </div>
            <div className="data-input-group">
              <Label>TELEFONO DE CONTACTO</Label>
              <p>{data.agencyName !== null ? data.agencyPhone : data.phone}</p>
            </div>
          </div>
          <div className="underline" />
          <Button className="btn-link-primary align-self-end" color="primary" onClick={this.toggle} >VER MÁS</Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Información del usuario</ModalHeader>
          <ModalBody>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Label>{data.agencyName !== null ? 'NOMBRE DE LA AGENCIA' : 'NOMBRE'}</Label>
                  <p>{data.agencyName !== null ? data.agencyEmail : data.email}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <Label>NOMBRE DEL RESPONSABLE</Label>
                  <p>{data.name}</p>
                </Col>}
              </Row>
              <Row>
                <Col md={6}>
                  <Label>{data.agencyName !== null ? 'EMAIL DE LA AGENCIA' : 'EMAIL'}</Label>
                  <p>{data.agencyName !== null ? data.agencyEmail : data.email}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <Label>EMAIL DEL RESPONSABLE</Label>
                  <p>{data.email}</p>
                </Col>}
              </Row>
              <Row>
                <Col md={6}>
                  <Label>{data.agencyName !== null ? 'TELÉFONO DE LA AGENCIA' : 'TELÉFONO'}</Label>
                  <p>{data.agencyName !== null ? data.agencyPhone : data.phone}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <Label>TELÉFONO DEL RESPONSABLE</Label>
                  <p>{data.phone}</p>
                </Col>}
              </Row>
              <Row>
                <Col md={6}>
                  <Label>{data.agencyName !== null ? 'DIRECCIÓN DE LA AGENCIA' : 'DIRECCIÓN'}</Label>
                  <p>{data.agencyName !== null ? data.agencyAdress : data.address}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <Label>DIRECCIÓN DEL RESPONSABLE</Label>
                  <p>{data.address}</p>
                </Col>}
              </Row>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>OK</Button>
          </ModalFooter>
        </Modal>
      </Col>
    );
  }
}

export default CardPublication;
