import React from 'react';
import { Row, Button } from 'reactstrap';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';

import Input from './Input';
import InputOrText from './InputOrText';

/* eslint react/jsx-filename-extension: 0 */
ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

class BannerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValidate: true,
      text: 'Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!',
    };
  }

  start() {
    const dataUser = {
      email: this.state.email,
    };
    ReactGA.event({
      category: 'Usuario Plans',
      action: 'Ir a Registro Usuario',
    });
    this.props.history.push(`/userRegisterS1?${stringify(dataUser)}`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-user.png) no-repeat center center' }}>
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
                  <h5><strong>¡Registrate gratis!</strong></h5>
                  <Input
                    type="email"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    validate={isValid => this.setState({ emailValidate: isValid })}
                    placeholder="Correo electrónico"
                  />
                  <Button color="primary" className="btn-block" disabled={!this.state.emailValidate} onClick={() => this.start()} >Comenzar</Button>
                </div>
              </div>
            </Row>
          </div>

        </Row>
      </div>
    );
  }
}

export default BannerUser;
