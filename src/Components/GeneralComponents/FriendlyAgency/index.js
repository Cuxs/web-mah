/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Alert } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

import TopTopNav from '../../../stories/TopTopNav';
import SearchBar from '../../../stories/SearchBar';
import PublicityBanner from '../../../stories/PublicityBanner';
import CardAgency from '../../../stories/CardAgency';
import Footer from '../../../stories/Footer';
import Input from '../../../stories/Input';
import { GetAllAgencies } from '../../../ApolloQueries/FriendlyAgencyQueries';

class FriendlyAgency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAgency: '',
      nameAgencyValidate: false,
      email: '',
      emailValidate: false,
    };
    this.redirect = this.redirect.bind(this);
  }

  disabled() {
    return !(this.state.nameAgencyValidate && this.state.emailValidate);
  }

  redirect() {
    this.props.history.push(`/agencyRegisterS1?email=${this.state.email}&nameAgency=${this.state.nameAgency}`);
  }

  render() {
    const { history, location, Agencies } = this.props;
    return (
      <div>
        <div>
          <TopTopNav history={history} />
          <SearchBar
            history={history}
            location={location}
          />
          <div className="container">
            <Row className="mb-4 mt-4">
              <Col md="8" sm="12" xs="12" />
              <Col lg="4" md="12" sm="12" xs="12">
                <PublicityBanner history={history} />
              </Col>
            </Row>
            <Row>
              <Col md="12" sm="12" xs="12">
                <h3 className="title-division">Concesionarios adheridos</h3>
              </Col>
            </Row>
            <Row>
              <Col lg="8" md="12" sm="12" xs="12" className="container-data-input-group">
                {Agencies.loading ?
                  <img
                    className="loading-gif"
                    style={{ height: '70px' }}
                    src="/loading.gif"
                    key={0}
                    alt="Loading..."
                  /> :
              Agencies.GetAllAgencies.map(agencyData => <CardAgency data={agencyData} history={history} />)
          }
              </Col>
              <Col lg="3" md="12" sm="12" xs="12">
                <h5 className="title-division-primary">Adherí tu compañía, <br /> es muy fácil.</h5>
                <p>Publicaciones gratis ilimitadas.</p>
                <div className="cont-form">
                  <h5><strong>¡Registrate gratis y empezá a vender ahora!</strong></h5>
                  <Input
                    placeholder="Nombre de la concesionaria"
                    type="text"
                    value={this.state.nameAgency}
                    onChange={event => this.setState({ nameAgency: event.target.value })}
                    validate={isValid => this.setState({ nameAgencyValidate: isValid })}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    validate={isValid => this.setState({ emailValidate: isValid })}
                  />
                  <Button color="primary" className="btn-block" disabled={this.disabled()} onClick={() => this.redirect()} >Comenzar</Button>
                </div>
              </Col>
            </Row>
          </div>
          <Footer history={history} />
        </div>
      </div>
    );
  }
}
const withAgenciesData = graphql(GetAllAgencies, { name: 'Agencies' });
const withData = compose(withAgenciesData);
export default withData(FriendlyAgency);
