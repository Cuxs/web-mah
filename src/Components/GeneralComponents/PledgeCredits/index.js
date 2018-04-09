/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Slider from 'react-rangeslider';
import _ from 'lodash';
import { parse } from 'query-string';
import { graphql, compose } from 'react-apollo';


import SearchBar from '../../../stories/SearchBar';
import Input from '../../../stories/Input';
import { thousands } from '../../../Modules/functions';
import InputOrText from '../../../stories/InputOrText';
import {
  GetTextsQuery,
} from '../../../ApolloQueries/TextsQueries';
import { P } from 'glamorous';

class PledgeCredits extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      time: 12,
      mount: '',
      mountValidate: false,
      fee: '',
      name: '',
      nameValidate: false,
      dni: '',
      dniValidate: false,
      address: '',
      addressValidate: false,
      ganancy: '',
      ganancyValidate: false,
      financyAmount: '',
      financyAmountValidate: false,
      creditReason: '',
      creditReasonValidate: false,
      email: '',
      emailValidate: false,
      phone: '',
      phoneValidate: false,
      messagge: '',
      modal: false,
      fetched: false,
      isAdmin: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.Texts.loading) {
      const texts = {};
      texts.fetched = true;
      nextProps.Texts.PageTexts.map(row => texts[row.section] = row.text);
      this.setState({ ...texts });
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  disabled() {
    const {
      nameValidate, dniValidate, addressValidate, ganancyValidate, financyAmountValidate, creditReasonValidate, emailValidate, phoneValidate,
    } = this.state;
    return !(nameValidate && dniValidate && addressValidate && ganancyValidate && financyAmountValidate && creditReasonValidate && emailValidate && phoneValidate);
  }

  requestCredit() {
    const dataRequest = {
      name: this.state.name,
      dni: this.state.dni,
      address: this.state.address,
      ganancy: this.state.ganancy,
      financyAmount: this.state.financyAmount,
      creditReason: this.state.creditReason,
      email: this.state.email,
      phone: this.state.phone,
      messagge: this.state.messagge,
    };
  }

  updateTime(time) {
    this.setState({ time });
    this.simulateFee(time, parseFloat(this.state.mount));
  }

  updateMount(mount) {
    if (mount === 0 || mount === '') {
      this.setState({ mount, mountValidate: false });
    }
    const re = /^\d+$/;
    if (re.test(mount) === true) {
      if (mount > 0) {
        this.setState({ mount, mountValidate: true });
      }
    }
    this.simulateFee(this.state.time, mount);
  }

  simulateFee(time, mount) {
    let tasa = 0;
    if (this.props.location.search !== '' && parse(this.props.location.search).year < 2008) {
      switch (time) {
        case 12:
          tasa = 0.04;
          break;
        case 36:
          tasa = 0.0455;
          break;
        default:
          tasa = 0.0425;
          break;
      }
    } else {
      switch (time) {
        case 12:
          tasa = 0.0375;
          break;
        case 36:
          tasa = 0.0425;
          break;
        default:
          tasa = 0.04;
          break;
      }
    }
    const preresult = 1 + (time * tasa);
    const preresult1 = preresult * parseFloat(mount);
    const fee = preresult1 / time;
    return this.setState({ fee });
  }

  render() {
    const dataPublication = this.props.location.search === '' ? '' : parse(this.props.location.search);
    const labels = {
      12: '12', 18: '18', 24: '24', 36: '36',
    };
    const fillStyle = { backgroundColor: '#e70404' };
    return (
      <div>
        <SearchBar history={this.props.history} location={this.props.location} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 col-sm-12 float-right">
                {this.state.isAdmin ?
                  this.state.fetched &&
                  <div>
                    <InputOrText type="p" text={this.state.title1} style="title-division-primary" onChange={title1 => this.setState({ title1 })} />
                    <InputOrText text={this.state.text1} onChange={text1 => this.setState({ text1 })} />
                    <div className="steps">
                      <div className="step">
                        <InputOrText type="h6" text={this.state.title2} onChange={title2 => this.setState({ title2 })} />
                        <InputOrText type="h4" text={this.state.text2} onChange={text2 => this.setState({ text2 })} />
                      </div>

                      <div className="step">
                        <InputOrText type="h6" text={this.state.title3} onChange={title3 => this.setState({ title3 })} />
                        <InputOrText type="h4" text={this.state.text3} onChange={text3 => this.setState({ text3 })} />
                      </div>
                    </div>
                  </div>
                :
                  <div>
                    <div className="text-block">
                      <h4 className="title-division-primary">{this.state.title1}</h4>
                    </div>
                    <div className="text-block">
                      <p>{this.state.text1}</p>
                    </div>
                    <div className="steps">
                      <div className="step">
                        <h6>{this.state.title2}</h6>
                        <h4>{this.state.text2}</h4>
                      </div>

                      <div className="step">
                        <h6>{this.state.title3}</h6>
                        <h4>{this.state.text3}</h4>
                      </div>
                    </div>
                  </div>
                }

                <h6>SIMULÁ TU CUOTA</h6>
                <div className="simulator-container" >
                  <Input
                    label="Monto a financiar *"
                    type="number"
                    value={this.state.mount}
                    onChange={event => this.updateMount(event.target.value)}
                    validate={isValid => this.setState({ mountValid: isValid })}
                    placeholder="De $10.000 a $150.000"
                  />
                  <Label for="exampleEmail">Cantidad de cuotas</Label>
                  <Slider
                    min={12}
                    max={36}
                    step={6}
                    labels={labels}
                    value={this.state.time}
                    orientation="horizontal"
                    fillStyle={fillStyle}
                    onChange={time => this.updateTime(time)}
                  />
                  {this.state.mountValidate &&
                    <div className="d-flex flex-column align-items-center price-container">
                      <h2><b>$ {_.ceil(this.state.fee, 2)}</b></h2>
                      <h6>TU CUOTA</h6>
                    </div>
                  }
                </div>

                {this.state.isAdmin ?
                  this.state.fetched &&                
                  <small>
                    <InputOrText type="h6" text={this.state.text4} onChange={text4 => this.setState({ text4 })} />
                    <InputOrText text={this.state.text5} style="small-letter" onChange={text5 => this.setState({ text5 })} />
                  </small>
                :
                  <small>
                    <h6>{this.state.text4}</h6>
                    <p className="small-letter">{this.state.text5}</p>
                  </small>
                }

              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                {dataPublication !== '' &&
                  <div className="d-flex flex-column box-detail-car">
                    <h6><b>{`${dataPublication.brand} ${dataPublication.group} `} </b></h6>
                    <h6>{dataPublication.modelName}</h6>
                    <h5><b>{dataPublication.price ? `$ ${thousands(dataPublication.price, 2, ',', '.')}` : 'Consultar'}</b></h5>
                    <h6>{`${dataPublication.year} - ${thousands(dataPublication.kms, 0, ',', '.')} km`}</h6>
                  </div>
                }
                <div className="underline" />

                <h4 className="title-division">Solicitá tu crédito!</h4>
                <Input
                  label="Nombre y Apellido"
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  validate={isValid => this.setState({ nameValidate: isValid })}
                />
                <Input
                  label="Documento de Identidad"
                  type="number"
                  value={this.state.dni}
                  onChange={event => this.setState({ dni: event.target.value })}
                  validate={isValid => this.setState({ dniValidate: isValid })}
                />
                <Input
                  label="Domicilio"
                  type="alphanumeric"
                  value={this.state.address}
                  onChange={event => this.setState({ address: event.target.value })}
                  validate={isValid => this.setState({ addressValidate: isValid })}
                />
                <Input
                  label="Ingresos"
                  type="number"
                  value={this.state.ganancy}
                  onChange={event => this.setState({ ganancy: event.target.value })}
                  validate={isValid => this.setState({ ganancyValidate: isValid })}
                />
                <Input
                  label="Monto a financiar"
                  type="number"
                  value={this.state.financyAmount}
                  onChange={event => this.setState({ financyAmount: event.target.value })}
                  validate={isValid => this.setState({ financyAmountValidate: isValid })}
                />
                <Input
                  label="Destino del crédito"
                  type="string"
                  value={this.state.creditReason}
                  onChange={event => this.setState({ creditReason: event.target.value })}
                  validate={isValid => this.setState({ creditReasonValidate: isValid })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  validate={isValid => this.setState({ emailValidate: isValid })}
                />
                <Input
                  label="Teléfono"
                  type="number"
                  value={this.state.phone}
                  onChange={event => this.setState({ phone: event.target.value })}
                  validate={isValid => this.setState({ phoneValidate: isValid })}
                />
                <Input
                  label="Mensaje"
                  type="textarea"
                  value={this.state.messagge}
                  onChange={event => this.setState({ messagge: event.target.value })}
                  validate={isValid => this.setState({ messaggeValidate: isValid })}
                />
                <Button color="primary" className="float-right" disabled={this.disabled()} onClick={() => this.requestCredit()} > Solicitar</Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggleModal}>¡Felicitaciones!</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">Tu consulta ha sido enviado correctamente. Nos contactaremos a la brevedad para brindarte toda la información necesaria.</div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.props.history.push('/')} >OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const withTextsQuery = graphql(GetTextsQuery, { options: { variables: { route: 'pledgeCredits' } }, name: 'Texts' });
const withData = compose(withTextsQuery);

export default withData(PledgeCredits);
