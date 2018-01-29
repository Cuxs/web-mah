import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

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
        <div className="box-item" >
          <div className="item-data" >
            <div className="d-flex flex-row align-items-center" >
              <p className="item-name"><strong>{data.agencyName !== null ? data.agencyName : data.name}</strong></p>
              <button className="btn btn-social-icon" onClick={this.toggle} >
                <span className="fa fa-ellipsis-v" />
              </button>
            </div>
            <p className="item-description">EMAIL</p>
            <p className="item-price">{data.agencyName !== null ? data.agencyEmail : data.email}</p>
            <p className="item-description">TELÉFONO</p>
            <p className="item-price">{data.agencyName !== null ? data.agencyEmail : data.email}</p>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Información del usuario</ModalHeader>
          <ModalBody>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <p className="item-description">{data.agencyName !== null ? 'NOMBRE DE LA AGENCIA' : 'NOMBRE'}</p>
                  <p className="item-price">{data.agencyName !== null ? data.agencyEmail : data.email}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <p className="item-description">NOMBRE DEL RESPONSABLE</p>
                  <p className="item-price">{data.name}</p>
                </Col>}
              </Row>
              <Row>
                <Col md={6}>
                  <p className="item-description">{data.agencyName !== null ? 'EMAIL DE LA AGENCIA' : 'EMAIL'}</p>
                  <p className="item-price">{data.agencyName !== null ? data.agencyEmail : data.email}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <p className="item-description">EMAIL DEL RESPONSABLE</p>
                  <p className="item-price">{data.email}</p>
                </Col>}
              </Row>
              <Row>
                <Col md={6}>
                  <p className="item-description">{data.agencyName !== null ? 'TELÉFONO DE LA AGENCIA' : 'TELÉFONO'}</p>
                  <p className="item-price">{data.agencyName !== null ? data.agencyPhone : data.phone}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <p className="item-description">TELÉFONO DEL RESPONSABLE</p>
                  <p className="item-price">{data.phone}</p>
                </Col>}
              </Row>
              <Row>
                <Col md={6}>
                  <p className="item-description">{data.agencyName !== null ? 'DIRECCIÓN DE LA AGENCIA' : 'DIRECCIÓN'}</p>
                  <p className="item-price">{data.agencyName !== null ? data.agencyAdress : data.address}</p>
                </Col>
                {data.agencyName !== null &&
                <Col md={6}>
                  <p className="item-description">DIRECCIÓN DEL RESPONSABLE</p>
                  <p className="item-price">{data.address}</p>
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
