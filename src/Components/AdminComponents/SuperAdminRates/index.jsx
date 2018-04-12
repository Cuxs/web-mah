import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import { isAdminLogged } from '../../../Modules/sessionFunctions';
import AdminBar from '../../../stories/AdminBar';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';
import {RatesMutation, RatesQuery} from '../../../ApolloQueries/RatesQuery';

class SuperAdminRates extends Component {
  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
  }
  render() {
    const { location, history } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col md="9" className="mt-4">
              <p>Choripa </p>
            </Col>
          </Row>

        </div>
      </div>);
  }
}
export default SuperAdminRates;
