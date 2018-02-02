import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

import photoGaleryParser from '../Modules/photoGaleryParser';
import { thousands } from '../Modules/functions';
import { getUserToken } from '../Modules/sessionFunctions';
import { markAsSoldMutation, highlightPublication } from '../ApolloQueries/UserPublicationsQuery';

/* eslint react/jsx-filename-extension:0 */
/* eslint class-methods-use-this: 0 */
class CardPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalState: false,
      modalTitle: '',
      modalMessage: '',
      pubId: '',
      modal: false,

    };
    this.toggle = this.toggle.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.changeToSoldState = this.changeToSoldState.bind(this);
  }
  isPubVisible(stateName) {
    if (
      stateName === 'Publicada' ||
      stateName === 'Destacada' ||
      stateName === 'Vendida' ||
      stateName === 'Apto para garantía'
    ) {
      return true;
    }
    return false;
  }
  pubStateClass(stateName) {
    switch (stateName) {
      case 'Publicada': return 'published';
      case 'Vendida': return 'sold';
      case 'Destacada': return 'highlighted';
      case 'Pendiente': return 'pending';
      default: return '';
    }
  }
  isPubEditable(stateName) {
    if (
      stateName === 'Publicada' ||
      stateName === 'Destacada' ||
      stateName === 'Apto para garantía'
    ) {
      return true;
    }
    return false;
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleModalState(pubId) {
    this.setState({
      modalState: !this.state.modalState,
      pubId,
    });
  }
  changeToSoldState() {
    this.props.ChangeToSold({
      variables: {
        MAHtoken: getUserToken(),
        publication_id: this.state.pubId,
      },
    })
      .then((data) => {
        this.toggleModalState('');
        this.setState({
          modalTitle: 'Felicitaciones.',
          modalMessage: 'La publicación ha sida marcada como vendida. Felicitaciones!',
          modal: true,
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          this.toggleModalState('');
          graphQLErrors.map(({ message }) =>
            this.setState({
              modalTitle: 'Error',
              modalMessage: message,
              modal: true,
            }));
        }
        if (networkError) {
          this.setState({
            modalTitle: 'Error',
            modalMessage: networkError,
            modal: true,
          });
        }
      });
  }

  changeToHighlightState() {
    this.props.HighLightPub({
      variables: {
        MAHtoken: getUserToken(),
        publication_id: this.state.pubId,
      },
    })
      .then((data) => {
        this.toggleModalState('');
        this.setState({
          modalTitle: 'Felicitaciones.',
          modalMessage: 'La publicación ha sida marcada como destacada.',
          modal: true,
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          this.toggleModalState('');
          graphQLErrors.map(({ message }) =>
            this.setState({
              modalTitle: 'Error',
              modalMessage: message,
              modal: true,
            }));
        }
        if (networkError) {
          this.setState({
            modalTitle: 'Error',
            modalMessage: networkError,
            modal: true,
          });
        }
      });
  }
  render() {
    const {
      onHighlight,
      data,
      data: { CurrentState: { stateName } },
    } = this.props;
    return (
      <div className="box-item" >
        <div className="row item-car wide" >
          <div className="col-12 col-lg-4 col-md-4 col-sm-4">
            <div className="row">
              <img
                src={photoGaleryParser(data.ImageGroup)[0].src}
                alt="banner"
                width="100%"
              />
            </div>
          </div>
          <div className="col-12 col-lg-8 col-md-8 col-sm-8">
            <div className="item-data" >
              <p className={`item-state badge badge-secondary ${this.pubStateClass(stateName)}`}>{stateName}</p>
              <p className="item-name"><strong>{data.brand} {data.group}</strong></p>
              <p className="item-description">{data.model}</p>
              <p className="item-price">
                <strong>${thousands(data.price, 2, ',', '.')}</strong>
              </p>
              <small>
                {data.year} - {thousands(data.kms, 0, ',', '.')}km
              </small>
            </div>
            <div className="d-flex flex-column align-items-end item-visibility">
              <h6>Publicación {!this.isPubVisible(stateName) && 'no'} visible</h6>
            </div>
            <div className="item-admin" >
              {stateName !== 'Vendida' && <Button onClick={() => { this.toggleModalState(data.id); }} className="btn-default btn-link-primary float-left">Marcar como Vendido</Button>}
              {this.isPubEditable(stateName) &&
              <Button className="btn-default btn-link-primary float-right">
                <img src="/assets/images/icon-edit-red.svg" alt="E" /> Editar
              </Button>}
              {this.isPubVisible(stateName) && stateName !== 'Destacada' && stateName !== 'Vendida' &&
              <Button className="btn-default btn-link-primary float-right" onClick={() => onHighlight()} >
                <img src="/assets/images/icon-star-red.svg" alt="D" /> Destacar
              </Button>}
              <div className="clearfix" />
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modalState} toggle={this.toggleModalState} className={this.props.className}>
          <ModalHeader toggle={this.toggleModalState}>Confirme</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
                ¿Pudiste vender este vehículo?
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.changeToSoldState()}>OK</Button>
            <Button color="secondary" onClick={() => this.toggleModalState()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.modalMessage}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const withMarkPublicationAsSold = graphql(markAsSoldMutation, { name: 'ChangeToSold' });
const withHighlightPublication = graphql(markAsSoldMutation, { name: 'HighlightPub' });
const withData = compose(withMarkPublicationAsSold, withHighlightPublication);


export default withData(CardPublication);
