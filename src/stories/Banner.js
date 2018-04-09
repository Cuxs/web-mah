import React from 'react';
import { Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */
import InputOrText from './InputOrText';


class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      text: 'Cambia la forma de comprar o vender tu auto',
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-home.png) no-repeat center center' }}>
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {this.state.isAdmin ?
                  <InputOrText type="h3" text={this.state.text} onChange={text => this.setState({ text })} />
                :
                  <h3>{this.state.text}</h3>
                }
              </div>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}

export default Banner;

