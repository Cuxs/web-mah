/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import AdminSideBar from '../../stories/AdminSideBar';
import AdminFilter from '../../stories/AdminFilter';
import CardMessagge from '../../stories/CardMessagge';

import style from '../../Styles/pledgeCredits';


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
    return (
      <div>
        <AdminBar />
    
        <Row>
          <Col md="3">
            <AdminSideBar />
          </Col>
          <Col md="9">
            <AdminFilter />
            <CardMessagge />
            <CardMessagge />
            <CardMessagge />
          </Col>
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default AgencyAdmin;
