/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import UserSideBar from '../../stories/UserSideBar';
import AdminFilter from '../../stories/AdminFilter';
import CardPublication from '../../stories/CardPublication';

import style from '../../Styles/pledgeCredits';


class UserPublications extends React.Component {
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
        <AdminBar history={this.props.history} />
    
        <Row>
          <Col md="3">
            <UserSideBar />
          </Col>
          <Col md="9">
            <AdminFilter />
            <CardPublication onHighlight={() => this.toggle()} />
            <CardPublication onHighlight={() => this.toggle()} />
            <CardPublication onHighlight={() => this.toggle()} />
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

export default UserPublications;
