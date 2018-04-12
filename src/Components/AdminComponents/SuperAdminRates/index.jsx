import React, { Component } from 'react';
import { Col, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

import { isAdminLogged, getUserToken } from '../../../Modules/sessionFunctions';
import AdminBar from '../../../stories/AdminBar';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';
import { RatesMutation, RatesQuery } from '../../../ApolloQueries/RatesQuery';

class SuperAdminRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyActive: false,
    };
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.rates.loading) {
      this.setState({
        rate0: newProps.rates.AllRates[0].rate,
        rate1: newProps.rates.AllRates[1].rate,
        rate2: newProps.rates.AllRates[2].rate,
        rate3: newProps.rates.AllRates[3].rate,
        rate4: newProps.rates.AllRates[4].rate,
        rate5: newProps.rates.AllRates[5].rate,
        rate6: newProps.rates.AllRates[6].rate,
        rate7: newProps.rates.AllRates[7].rate,
      });
    }
  }

  update() {
    this.props.ratesUpdate({
      variables: {
        MAHtoken: getUserToken(),
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone,
      },
      refetchQueries: ['User'],
    }).then(({ data: { modifyUserData: uData } }) => {
      this.setState({
        modal: true,
        name: uData.name,
        address: uData.address,
        phone: uData.phone,
        responseTitle: 'Felicitaciones',
        responseMsg: 'Datos actualizados con éxito',
      });
      this.toggle();
    }).catch(err => console.log(err));
  }

  render() {
    const { location, history, rates } = this.props;
    console.log(this.props.rates);
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col md="9" className="mt-4">
              <Row>
                {!rates.loading &&
                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <h6 className="title-division"><b>Tasas 2008 - 0km</b></h6>
                    <div className="data-input-group">
                      <label>Plazo 12</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate0} onChange={event => this.setState({ rate0: event.target.value })} />
                      : <p>{this.state.rate0}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>Plazo 18</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate1} onChange={event => this.setState({ rate1: event.target.value })} />
                      : <p>{this.state.rate1}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>Plazo 24</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate2} onChange={event => this.setState({ rate2: event.target.value })} />
                      : <p>{this.state.rate2}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>Plazo 36</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate3} onChange={event => this.setState({ rate3: event.target.value })} />
                      : <p>{this.state.rate3}</p>}
                    </div>

                    <div className="underline" />
                    {this.state.modifyActive ?
                      <span>
                        <Button color="primary" className="btn-link-primary align-self-end" onClick={() => this.update()}>  <img src="/assets/images/icon-check-red.svg" alt="" />Guardar</Button>
                        <Button color="warning" className="btn-link-warning align-self-end" >Cancelar</Button>
                      </span>
                  : <Button className="btn-link-primary align-self-end" color="primary" onClick={() => this.setState({ modifyActive: true })} >Modificar</Button>}
                  </div>
                </Col>}
                {!rates.loading &&
                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{ height: '100%' }}>
                    <h6 className="title-division"><b>Tasas 2003 - 2007</b></h6>
                    <div className="data-input-group">
                      <label>Plazo 12</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate4} onChange={event => this.setState({ rate4: event.target.value })} />
                      : <p>{this.state.rate4}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>Plazo 18</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate5} onChange={event => this.setState({ rate5: event.target.value })} />
                      : <p>{this.state.rate5}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>Plazo 24</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate6} onChange={event => this.setState({ rate6: event.target.value })} />
                      : <p>{this.state.rate6}</p>}
                    </div>
                    <div className="data-input-group">
                      <label>Plazo 36</label>
                      {this.state.modifyActive
                      ? <Input type="numeric" value={this.state.rate7} onChange={event => this.setState({ rate7: event.target.value })} />
                      : <p>{this.state.rate7}</p>}
                    </div>

                    <div className="underline" />
                    {this.state.modifyActive ?
                      <span>
                        <Button color="primary" className="btn-link-primary align-self-end" onClick={() => this.update()}>  <img src="/assets/images/icon-check-red.svg" alt="" />Guardar</Button>
                        <Button color="warning" className="btn-link-warning align-self-end" >Cancelar</Button>
                      </span>
                  : <Button className="btn-link-primary align-self-end" color="primary" onClick={() => this.setState({ modifyActive: true })} >Modificar</Button>}
                  </div>
                </Col>}
              </Row>


            </Col>
          </Row>

        </div>
      </div>);
  }
}


const withRatesQuery = graphql(RatesQuery, { name: 'rates' });
const withRatesMutation = graphql(RatesMutation, { name: 'ratesUpdate' });
const withData = compose(
  withRatesQuery,
  withRatesMutation,
);

export default withData(SuperAdminRates);
