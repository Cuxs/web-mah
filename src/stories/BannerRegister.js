import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
import { stringify } from 'query-string';

/* eslint react/jsx-filename-extension: 0 */

class BannerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agencyName: '',
      email: '',
    };
  }

  start() {
    const dataAgency = {
      agencyName: this.state.agencyName,
      email: this.state.email,
    };
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-agency.png) no-repeat center center' }}>
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                <h3>Publicá gratis, todos tus datos y creá tu consecionaria online</h3>
              </div>
              <div className="container-data-input-group col-lg-4 col-md-5 col-sm-12 col-xs-12 float-right" >
                <div className="cont-form">
                  <h5><strong>¡Registrate gratis y empezá a vender ahora!</strong></h5>
                  <FormGroup>
                    <Input type="textarea" value={this.state.agencyName} onChange={event => this.setState({ agencyName: event.target.value })} placeholder="Nombre de la Consecionaria" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} placeholder="Correo electrónico" />
                  </FormGroup>
                  <Button color="primary" className="btn-block" onClick={() => this.start()} >Comenzar</Button>
                </div>
              </div>
            </Row>
          </div>

        </Row>
      </div>
    );
  }
}

export default BannerRegister;
