import React from 'react';
import { Row, Col, FormGroup, Input, Button } from 'reactstrap';
import { stringify } from 'query-string';

/* eslint react/jsx-filename-extension: 0 */

class BannerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  start() {
    const dataUser = {
      email: this.state.email,
    };
    this.props.history.push(`/userRegisterS1?${stringify(dataUser)}`);
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-user.png) no-repeat center center' }}>
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                <h3>Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!</h3>
              </div>
              <div className="container-data-input-group col-lg-4 col-md-5 col-sm-12 col-xs-12 float-right" >
                <div className="cont-form">
                  <h5><strong>¡Registrate gratis!</strong></h5>
                  <FormGroup>
                    <Input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                  </FormGroup>
                  <Button color="primary" onClick={() => this.start()} >Comenzar</Button>
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
