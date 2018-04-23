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
import { RatesQuery } from '../../../ApolloQueries/RatesQuery';
import { isAdminLogged } from '../../../Modules/sessionFunctions';
import { P } from 'glamorous';
import {requestCredit} from '../../../Modules/fetches';

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
      modalMessage:'',
      fetched: false,
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
    if (!nextProps.rates.loading) {
      this.setState({
        rate0: nextProps.rates.AllRates[0].rate,
        rate1: nextProps.rates.AllRates[1].rate,
        rate2: nextProps.rates.AllRates[2].rate,
        rate3: nextProps.rates.AllRates[3].rate,
        rate4: nextProps.rates.AllRates[4].rate,
        rate5: nextProps.rates.AllRates[5].rate,
        rate6: nextProps.rates.AllRates[6].rate,
        rate7: nextProps.rates.AllRates[7].rate,
      });
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
    const {
      nameValidate, dniValidate, addressValidate, ganancyValidate, financyAmountValidate, creditReasonValidate, emailValidate, phoneValidate,
    } = this.state;
    if (!(nameValidate && dniValidate && addressValidate && ganancyValidate && financyAmountValidate && creditReasonValidate && emailValidate && phoneValidate)) {
      this._inputName.validate('string');
      this._inputDni.validate('number');
      this._inputAddress.validate('string');
      this._inputFinancyAmount.validate('money');
      this._inputGanancy.validate('money');
      this._inputCreditReason.validate('string');
      this._inputEmail.validate('email');
      this._inputPhone.validate('number');
      return false;
    }

    const dataRequest = {
      name: this.state.name,
      dni: this.state.dni,
      address: this.state.address,
      ganancy: this.state.ganancy,
      financyAmount: this.state.financyAmount,
      creditReason: this.state.creditReason,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.messagge,
    };

    requestCredit(dataRequest)
      .then(()=>{
        this.setState({
          modalTitle: 'Listo!',
          modalMessage:'Tu consulta ha sido enviado correctamente. Nos contactaremos a la brevedad para brindarte toda la información necesaria.',
          modal:true,
        })
      })
      .catch((e)=>{
        console.log(e)
        this.setState({
          modalTitle: 'Error',
          modalMessage: 'Tu consulta no se pudo realizar, intenta mas tarde. Discula las molestias',
          modal:true,
        })
      })
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
          tasa = this.state.rate0;
          break;
        case 18:
          tasa = this.state.rate1;
          break;
        case 24:
          tasa = this.state.rate2;
          break;
        default:
          tasa = this.state.rate3;
          break;
      }
    } else {
      switch (time) {
        case 12:
          tasa = this.state.rate4;
          break;
        case 18:
          tasa = this.state.rate5;
          break;
        case 24:
          tasa = this.state.rate6;
          break;
        default:
          tasa = this.state.rate7;
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
    let multipleLines = ['...'];
    if (this.state.fetched) {
      multipleLines = this.state.text5.split(/\n/);
    }
    return (
      <div>
        <SearchBar history={this.props.history} location={this.props.location} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 col-sm-12 float-right">
                {isAdminLogged() ?
                  this.state.fetched &&
                  <div>
                    <InputOrText type="p" section="title1" route={this.props.location.pathname.slice(1)} text={this.state.title1} style="title-division-primary" onChange={title1 => this.setState({ title1 })} />
                    <InputOrText text={this.state.text1} section="text1" route={this.props.location.pathname.slice(1)} onChange={text1 => this.setState({ text1 })} />
                    <div className="steps">
                      <div className="step">
                        <InputOrText type="h6" section="title2" height="35px" route={this.props.location.pathname.slice(1)} text={this.state.title2} onChange={title2 => this.setState({ title2 })} />
                        <InputOrText type="h4" section="text2" height="120px" route={this.props.location.pathname.slice(1)} text={this.state.text2} onChange={text2 => this.setState({ text2 })} />
                      </div>

                      <div className="step">
                        <InputOrText type="h6" section="title3" height="35px" route={this.props.location.pathname.slice(1)} text={this.state.title3} onChange={title3 => this.setState({ title3 })} />
                        <InputOrText type="h4" section="text3" route={this.props.location.pathname.slice(1)} text={this.state.text3} onChange={text3 => this.setState({ text3 })} />
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
                    type="money"
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

                {isAdminLogged() ?
                  this.state.fetched &&
                  <small>
                    <InputOrText section="text4" height="80px" route={this.props.location.pathname.slice(1)} type="h6" text={this.state.text4} onChange={text4 => this.setState({ text4 })} />
                    <InputOrText section="text5" height="430px" multiple route={this.props.location.pathname.slice(1)} text={this.state.text5} style="small-letter" onChange={text5 => this.setState({ text5 })} />
                  </small>
                :
                  <small>
                    <h6>{this.state.text4}</h6>
                    {multipleLines.map(row => <p className="small-letter">{row}</p>)}
                  </small>
                }

              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
            <form>
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
                  ref={inputName => (this._inputName = inputName)}
                  label="Nombre y Apellido"
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  validate={isValid => this.setState({ nameValidate: isValid })}
                />
                <Input
                  ref={inputDni => (this._inputDni = inputDni)}
                  label="Documento de Identidad"
                  type="number"
                  value={this.state.dni}
                  onChange={event => this.setState({ dni: event.target.value })}
                  validate={isValid => this.setState({ dniValidate: isValid })}
                />
                <Input
                  ref={inputAddress => (this._inputAddress = inputAddress)}
                  label="Domicilio"
                  type="alphanumeric"
                  value={this.state.address}
                  onChange={event => this.setState({ address: event.target.value })}
                  validate={isValid => this.setState({ addressValidate: isValid })}
                />
                <Input
                  ref={inputGanancy => (this._inputGanancy = inputGanancy)}
                  label="Ingresos"
                  type="money"
                  value={this.state.ganancy}
                  onChange={event => this.setState({ ganancy: event.target.value })}
                  validate={isValid => this.setState({ ganancyValidate: isValid })}
                />
                <Input
                  ref={inputFinancyAmount => (this._inputFinancyAmount = inputFinancyAmount)}
                  label="Monto a financiar"
                  type="money"
                  value={this.state.financyAmount}
                  onChange={event => this.setState({ financyAmount: event.target.value })}
                  validate={isValid => this.setState({ financyAmountValidate: isValid })}
                />
                <Input
                  ref={inputCreditReason => (this._inputCreditReason = inputCreditReason)}
                  label="Destino del crédito"
                  type="string"
                  value={this.state.creditReason}
                  onChange={event => this.setState({ creditReason: event.target.value })}
                  validate={isValid => this.setState({ creditReasonValidate: isValid })}
                />
                <Input
                  ref={inputEmail => (this._inputEmail = inputEmail)}
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  validate={isValid => this.setState({ emailValidate: isValid })}
                />
                <Input
                  ref={inputPhone => (this._inputPhone = inputPhone)}
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
                <Button color="primary" className="float-right" onClick={() => this.requestCredit()} > Solicitar</Button>
              </div>
              </form>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggleModal}>{this.state.modalTitle}</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">{this.state.modalMessage}</div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle} >OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const withTextsQuery = graphql(GetTextsQuery, { options: { variables: { route: 'pledgeCredits' } }, name: 'Texts' });
const withRatesQuery = graphql(RatesQuery, { name: 'rates' });
const withData = compose(withTextsQuery, withRatesQuery);

export default withData(PledgeCredits);
