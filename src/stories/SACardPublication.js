import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import photoGaleryParser from '../Modules/photoGaleryParser';
import { graphql, compose } from 'react-apollo';

import { AprovePublicationMutation, DisaprovePublicationMutation } from '../ApolloQueries/AdminPublicationQueries';
import { getUserToken } from '../Modules/sessionFunctions';

/* eslint react/jsx-filename-extension: 0 */
const isPubVisible = (stateName) => {
  if (stateName === 'Publicada' || stateName === 'Destacada' || stateName === 'Vendida' || stateName === 'Apto para garantía') {
    return true;
  }
  return false;
};

const isPubEditable = (stateName) => {
  if (stateName === 'Publicada' || stateName === 'Destacada' || stateName === 'Apto para garantía') {
    return true;
  }
  return false;
};

class SACardPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMsg: '',
      modalTitle: '',
      questionModal: false,
      questionModalTitle: '',
      questionModalText: '',
      verb: '',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleQuestionModal = this.toggleQuestionModal.bind(this);
  }
  aprove() {
    this.props.aprove({
      variables: {
        publication_id: this.props.data.id,
        MAHtoken: getUserToken(),
      },
    })
      .then(({ data: { aprovePublication: { CurrentState: { stateName } } } }) => {
        this.setState({
          modal: true,
          questionModal: false,
          modalTitle: 'Felicitaciones',
          modalMsg: `La publicación ha cambiado exitosamente a estado ${stateName}.`,
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) =>
            this.setState({
              modal: true,
              questionModal: false,
              modalTitle: 'Error',
              modalMsg: message,
            }));
        }
        if (networkError) {
          this.setState({
            modal: true,
            questionModal: false,
            modalTitle: 'Error',
            modalMsg: networkError,
          });
        }
      });
  }
  disaprove() {
    this.props.disaprove({
      variables: {
        publication_id: this.props.data.id,
        MAHtoken: getUserToken(),
      },
    })
      .then(({ data: { disaprovePublication: { CurrentState: { stateName } } } }) => {
        this.setState({
          modal: true,
          questionModal: false,
          modalTitle: 'Hecho',
          modalMsg: `La publicación ha cambiado exitosamente a estado ${stateName}.`,          
        });
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message }) =>
            this.setState({
              modal: true,
              questionModal: false,
              modalTitle: 'Error',
              modalMsg: message,
            }));
        }
        if (networkError) {
          this.setState({
            modal: true,
            questionModal: false,
            modalTitle: 'Error',
            modalMsg: networkError,
          });
        }
      });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleQuestionModal(verb) {
    this.setState({
      questionModal: !this.state.questionModal,
      questionModalText: `¿Esta seguro que desea ${verb} esta publicación?`,
      verb,
    });
  }

  render() {
    const { data, history, data: { CurrentState: { stateName } } } = this.props;
    return (
      <div className="box-item" >
        <div className="row item-car wide" >
          <div className="col-4">
            <div className="row">
              <img
                src={photoGaleryParser(data.ImageGroup)[0].src}
                alt="banner"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className="col-8">
            <div className="item-data" >
              <p className="item-state badge badge-secondary published">{stateName}</p>
              <p className="item-name"><strong>{data.User.agencyName === null ? data.User.name : data.User.agencyName}</strong></p>
              <p className="item-description">{data.brand} {data.group}</p>
              <small>{data.modelName}</small>
            </div>
            <div className="d-flex flex-column align-items-end item-visibility" >
              <h6>Publicación {!isPubVisible(stateName) && 'no'} visible</h6>
            </div>
            <div className="item-admin" >
              {(stateName !== 'Vendida' && stateName !== 'Pendiente') && <Button className="btn-default btn-link-primary float-left">Marcar como Vendido</Button>}
              {isPubEditable(stateName) && <Button className="btn-default btn-link-primary float-right">Editar</Button>}
              {isPubVisible(stateName) && stateName !== 'Destacada' && <Button className="btn-default btn-link-primary float-right" onClick={() => {}} >Destacar</Button>}
              <Button className="btn-default btn-link-primary float-right" onClick={() => history.push(`/carDetail?publication_id=${data.id}`)} >Ver Publicación</Button>
              {/* {stateName === 'Vencida' && <Button className="btn-default btn-link-primary float-right" onClick={() => {}} >Editar Vigencia</Button>} */}
              {stateName === 'Pendiente' && <Button className="btn-default btn-link-primary float-right" onClick={() => { this.toggleQuestionModal('desaprobar'); }} >Desaprobar</Button>}
              {stateName === 'Pendiente' && <Button className="btn-default btn-link-primary float-right" onClick={() => { this.toggleQuestionModal('aprobar'); }} >Aprobar</Button>}
              <div className="clearfix" />
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.modalMsg}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>OK</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.questionModal} toggle={this.toggleQuestionModal}>
          <ModalHeader toggle={this.toggleQuestionModal}>{this.state.questionModalTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.questionModalText}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => (this.state.verb === 'aprobar' ? this.aprove() : this.disaprove())}>Ok</Button>
            <Button color="secondary" onClick={() => this.toggleQuestionModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const withAproveMutation = graphql(AprovePublicationMutation, { name: 'aprove' });
const withDisaproveMutation = graphql(DisaprovePublicationMutation, { name: 'disaprove' });
const withData = compose(withAproveMutation, withDisaproveMutation);
export default withData(SACardPublication);
