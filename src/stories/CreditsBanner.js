import React from 'react';
import { Col, Row, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */
import InputOrText from './InputOrText';

class CreditsBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: true,
      title: 'Créditos Prendarios ',
      text: 'Créditos a tu medida, a las tazas más bajas y hasta con 60 meses de plazo.',
      title2: 'Personal Shopper ',
      text2: '¿Cansado de buscar? Te ayudamos a buscar un auto a tu medida asesorándote en cada proceso.',
      title3: 'Créditos de libre destino ',
      text3: 'Hacé con tu préstamo lo que desees y lo que siempre soñaste.',
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="home-posibilities">
          <Col md="4" sm="12" xs="12">
            <Row className="justify-content-between" style={{ height: '100%' }}>
              <Col md="4" sm="3" xs="12" className="text-right">
                <img src="/assets/images/icon-home-1.png" srcSet="/assets/images/icon-home-1@2x.svg" alt="banner" />
              </Col>
              <Col md="8" sm="9" xs="12" className="helper-align-flexs">
                {this.state.isAdmin ?
                  <div>
                    <InputOrText type="h5" text={this.state.title} onChange={title => this.setState({ title })} />
                    <InputOrText type="p" text={this.state.text} onChange={text => this.setState({ text })} />
                  </div>
                :
                  <div>
                    <h5>{this.state.title}</h5>
                    <p>{this.state.text}</p>
                  </div>
                }
                <Button color="primary" onClick={() => this.props.history.push('/pledgeCredits')} className="align-self-end"> Consultá</Button>
              </Col>
            </Row>
          </Col>
          <Col md="4" sm="12" xs="12">
            <Row className="justify-content-between" style={{ height: '100%' }}>
              <Col md="4" sm="3" xs="12" className="text-right">
                <img src="/assets/images/icon-home-2.png" srcSet="/assets/images/icon-home-2@2x.svg" alt="banner" />
              </Col>
              <Col md="8" sm="9" xs="12" className="helper-align-flexs">
                {this.state.isAdmin ?
                  <div>
                    <InputOrText type="h5" text={this.state.title2} onChange={title2 => this.setState({ title2 })} />
                    <InputOrText type="p" text={this.state.text2} onChange={text2 => this.setState({ text2 })} />
                  </div>
                :
                  <div>
                    <h5>{this.state.title2}</h5>
                    <p>{this.state.text2}</p>
                  </div>
                }
                <Button color="primary" onClick={() => this.props.history.push('/personalShopperS1')} className="align-self-end"> Consultá</Button>
              </Col>
            </Row>
          </Col>
          <Col md="4" sm="12" xs="12">
            <Row className="justify-content-between" style={{ height: '100%' }}>
              <Col md="4" sm="3" xs="12" className="text-right">
                <img src="/assets/images/icon-home-3.png" srcSet="/assets/images/icon-home-3@2x.svg" alt="banner" />
              </Col>
              <Col md="8" sm="9" xs="12" className="helper-align-flexs">
                {this.state.isAdmin ?
                  <div>
                    <InputOrText type="h5" text={this.state.title3} onChange={title3 => this.setState({ title3 })} />
                    <InputOrText type="p" text={this.state.text3} onChange={text3 => this.setState({ text3 })} />
                  </div>
                :
                  <div>
                    <h5>{this.state.title3}</h5>
                    <p>{this.state.text3}</p>
                  </div>
                }
                <Button color="primary" onClick={() => this.props.history.push('/freeDestinationCredits')} className="align-self-end"> Consultá</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreditsBanner;
