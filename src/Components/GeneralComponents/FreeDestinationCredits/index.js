/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import { graphql, compose, withApollo } from 'react-apollo';

import SearchBar from '../../../stories/SearchBar';
import Input from '../../../stories/Input';
import InputOrText from '../../../stories/InputOrText';
import { GetTextsQuery } from '../../../ApolloQueries/TextsQueries';
import { isAdminLogged } from '../../../Modules/sessionFunctions';

class FreeDestinationCredits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      title1: '',
      text1: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  disabled() {
    const {
      nameValidate,
      dniValidate,
      addressValidate,
      ganancyValidate,
      financyAmountValidate,
      creditReasonValidate,
      emailValidate,
      phoneValidate,
    } = this.state;
    return !(
      nameValidate &&
      dniValidate &&
      addressValidate &&
      ganancyValidate &&
      financyAmountValidate &&
      creditReasonValidate &&
      emailValidate &&
      phoneValidate
    );
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
    console.log(dataRequest);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.Texts.loading) {
      const texts = {};
      texts.fetched = true;
      nextProps.Texts.PageTexts.map(row => (texts[row.section] = row.text));
      this.setState({ ...texts });
    }
  }
  render() {
    return (
      <div>
        <SearchBar
          history={this.props.history}
          location={this.props.location}
        />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                {isAdminLogged() ? (
                  this.state.fetched && (
                    <div>
                      <InputOrText
                        section="title1"
                        height="70px"
                        route={this.props.location.pathname.slice(1)}
                        type="p"
                        text={this.state.title1}
                        style="title-division-primary"
                        onChange={title1 => this.setState({ title1 })}
                      />
                      <InputOrText
                        section="text1" route={this.props.location.pathname.slice(1)} 
                        text={this.state.text1}
                        onChange={text1 => this.setState({ text1 })}
                      />
                    </div>
                  )
                ) : (
                  <div className="text-block">
                    <h4 className="title-division-primary">
                      {this.state.title1}
                    </h4>
                    <p>{this.state.text1}</p>
                  </div>
                )}
                <div className="steps">
                  {isAdminLogged() ? (
                    this.state.fetched && (
                      <div className="step">
                        <InputOrText
                          type="h6"
                          text={this.state.title2}
                          section="title2" height="40px" route={this.props.location.pathname.slice(1)} 
                          onChange={title2 => this.setState({ title2 })}
                        />
                        <InputOrText
                        section="text2" height="120px" route={this.props.location.pathname.slice(1)} 
                          type="h4"
                          text={this.state.text2}
                          onChange={text2 => this.setState({ text2 })}
                        />
                      </div>
                    )
                  ) : (
                    <div className="step">
                      <h6>{this.state.title2}</h6>
                      <h4>{this.state.text2}</h4>
                    </div>
                  )}
                  {isAdminLogged() ? (
                    this.state.fetched && (
                      <div className="step">
                        <InputOrText
                        section="title3" height="40px" route={this.props.location.pathname.slice(1)} 
                          type="h6"
                          text={this.state.title3}
                          onChange={title3 => this.setState({ title3 })}
                        />
                        <InputOrText
                          type="h4"
                        section="text2" height="120px" route={this.props.location.pathname.slice(1)} 
                          
                          text={this.state.text2}
                          onChange={text2 => this.setState({ text2 })}
                        />
                      </div>
                    )
                  ) : (
                    <div className="step">
                      <h6>{this.state.title3}</h6>
                      <h4>{this.state.text3}</h4>
                    </div>
                  )}
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Solicitá tu crédito!</h4>
                <Input
                  label="Nombre y Apellido"
                  type="text"
                  value={this.state.name}
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
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
                  onChange={event =>
                    this.setState({ address: event.target.value })
                  }
                  validate={isValid =>
                    this.setState({ addressValidate: isValid })
                  }
                />
                <Input
                  label="Ingresos"
                  type="money"
                  value={this.state.ganancy}
                  onChange={event =>
                    this.setState({ ganancy: event.target.value })
                  }
                  validate={isValid =>
                    this.setState({ ganancyValidate: isValid })
                  }
                />
                <Input
                  label="Monto a financiar"
                  type="money"
                  value={this.state.financyAmount}
                  onChange={event =>
                    this.setState({ financyAmount: event.target.value })
                  }
                  validate={isValid =>
                    this.setState({ financyAmountValidate: isValid })
                  }
                />
                <Input
                  label="Destino del crédito"
                  type="text"
                  value={this.state.creditReason}
                  onChange={event =>
                    this.setState({ creditReason: event.target.value })
                  }
                  validate={isValid =>
                    this.setState({ creditReasonValidate: isValid })
                  }
                />
                <Input
                  label="Email"
                  type="text"
                  value={this.state.email}
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                  validate={isValid =>
                    this.setState({ emailValidate: isValid })
                  }
                />
                <Input
                  label="Teléfono"
                  type="number"
                  value={this.state.phone}
                  onChange={event =>
                    this.setState({ phone: event.target.value })
                  }
                  validate={isValid =>
                    this.setState({ phoneValidate: isValid })
                  }
                />
                <Input
                  label="Mensaje"
                  type="textarea"
                  value={this.state.messagge}
                  onChange={event =>
                    this.setState({ messagge: event.target.value })
                  }
                  validate={isValid =>
                    this.setState({ messaggeValidate: isValid })
                  }
                />
                <Button color="primary" className="float-right">
                  Solicitar
                </Button>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggleModal}>
              ¡Felicitaciones!
            </ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
                Tu consulta ha sido enviado correctamente. Nos contactaremos a
                la brevedad para brindarte toda la información necesaria.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => this.props.history.push('/')}
              >
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const withTextsQuery = graphql(GetTextsQuery, {
  options: { variables: { route: 'freeDestinationCredits' } },
  name: 'Texts',
});
const withData = compose(withTextsQuery);

export default withApollo(withData(FreeDestinationCredits));
