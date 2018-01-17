/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import AdminBar from '../../stories/AdminBar';
import AdminSideBar from '../../stories/AdminSideBar';

import style from '../../Styles/agency';


class AgencyAdmin extends React.Component {
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
    const data = [
      { name: 'Nov 1', autos: 2 },
      { name: 'Nov 15', autos: 4 },
      { name: 'Dic 1', autos: 3 },
      { name: 'Dic 15', autos: 5 },
      { name: 'Ene 1', autos: 5 },
      { name: 'Ene 15', autos: 7 },
      { name: 'Feb 1', autos: 6 },
    ];

    return (
      <div>
        <AdminBar history={this.props.history} />

        <Row>
          <Col md="3">
            <AdminSideBar history={this.props.history} />
          </Col>
          <Col md="9">
            <Row>
              <Col md="8">
                <Label for="exampleEmail">Reporte de autos vendidos</Label>
                <LineChart
                  width={600}
                  height={300}
                  data={data}
                  margin={{
                  top: 5, right: 20, bottom: 5, left: 0,
                  }}
                >
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="autos" stroke="blue" />
                </LineChart>
              </Col>
              <Col md="4">
                <Button onClick={() => this.props.history.push('/agencyMessage')} className="d-flex flex-row">
                  <div className="d-flex flex-column">
                    <h4>4</h4>
                    <h6>Nuevos Mensajes</h6>
                  </div>
                  <div className="container-icon" >
                    <span className="fa fa-commenting" />
                  </div>
                </Button>
                <Button onClick={() => this.props.history.push('/agencyPublications')} className="d-flex flex-row">
                  <div className="d-flex flex-column">
                    <h4>9</h4>
                    <h6>Publicaciones activas</h6>
                  </div>
                  <div className="container-icon" >
                    <span className="fa fa-car" />
                  </div>
                </Button>
                <Button onClick={() => this.props.history.push('/agencyPublications')} className="d-flex flex-row">
                  <div className="d-flex flex-column">
                    <h4>3</h4>
                    <h6>Destacados</h6>
                  </div>
                  <div className="container-icon" >
                    <span className="fa fa-star-o" />
                  </div>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
          <ModalBody>
            El pedido para destacar su publicación ha sido enviado. A la brevedad nos comunicaremos con usted.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>OK</Button>
          </ModalFooter>
        </Modal>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default AgencyAdmin;
