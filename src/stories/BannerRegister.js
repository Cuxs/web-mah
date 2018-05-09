import React from 'react';
import { Row, Button } from 'reactstrap';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';

import Input from './Input';
import InputOrText from './InputOrText';

/* eslint react/jsx-filename-extension: 0 */
ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

class BannerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAgency: '',
      nameAgencyValidate: true,
      email: '',
      emailValidate: true,
      text: 'Publicá gratis, todos tus datos y creá tu concesionaria online',
    };
  }

  disabled() {
    return !(this.state.nameAgencyValidate && this.state.emailValidate);
  }

  start() {
    const dataAgency = {
      nameAgency: this.state.nameAgency,
      email: this.state.email,
    };
    ReactGA.event({
      category: 'Agencia Plans',
      action: 'Ir a Registro Agencia',
    });
    this.props.history.push(`/agencyRegisterS1?${stringify(dataAgency)}`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-agency.png) no-repeat center center' }}>
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {this.state.isAdmin ?
                  <InputOrText type="h3" text={this.state.text} onChange={text => this.setState({ text })} />
                :
                  <h3>{this.state.text}</h3>
                }
              </div>
              <div className="container-data-input-group col-lg-4 col-md-5 col-sm-12 col-xs-12 float-right" >
                <div className="cont-form">
                  <h5><strong>¡Registrate gratis y empezá a vender ahora!</strong></h5>
                  <Input
                    type="text"
                    value={this.state.nameAgency}
                    onChange={event => this.setState({ nameAgency: event.target.value })}
                    validate={isValid => this.setState({ nameAgencyValidate: isValid })}
                    placeholder="Nombre de la concesionaria"
                  />
                  <Input
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    validate={isValid => this.setState({ emailValidate: isValid })}
                    placeholder="Correo electrónico"
                  />

                  <Button color="primary" disabled={this.disabled()} className="btn-block" onClick={() => this.start()} >Comenzar</Button>
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
