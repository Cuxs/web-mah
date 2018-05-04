/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Label, Input, ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import ScrollToTop from 'react-scroll-up';

import AdminBar from '../../../stories/AdminBar';

import ImageCrop from '../../../stories/ImageCrop';
import UserSideBar from '../../../stories/UserSideBar';
import { uploadAgencyImages } from '../../../Modules/fetches';
import parseError from '../../../Modules/errorParser';

import { AgencyDetailQuery } from '../../../ApolloQueries/AgencyProfileQuery';

import { getUserToken, getUserDataFromToken } from '../../../Modules/sessionFunctions';

class AgencyMicrosite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyActive: false,
      agencyName: '',
      agencyAdress: '',
      agencyEmail: '',
      agencyPhone: '',
      previewProfileImage: '',
      previewBannerImage: '',
      profileImage: '',
      bannerImage: '',
      responseMsg: '',
      responseTitle: '',
      modal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps({
    agencyData,
    agencyData: {
      User: {
        agencyAdress,
        agencyEmail,
        agencyName,
        agencyPhone,
        bannerImage,
        profileImage,
      },
    },
  }) {
    if (!agencyData.loading) {
      this.setState({
        agencyAdress,
        agencyEmail,
        agencyName,
        agencyPhone,
        previewProfileImage: _.isNull(profileImage) ? 'default.jpg' : profileImage,
        previewBannerImage: _.isNull(bannerImage) ? 'default.jpg' : bannerImage,
      });
    }
  }
  getBannerImage(img) {
    this.setState({ bannerImage: img });
  }
  getProfileImage(img) {
    this.setState({ profileImage: img });
  }
  toggle() {
    this.setState({ modifyActive: !this.state.modifyActive });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleSubmit() {
    const { profileImage, bannerImage } = this.state;
    const { id } = getUserDataFromToken();
    uploadAgencyImages(profileImage, bannerImage, id)
      .then((resp) => {
        this.setState({
          modal: true,
          responseTitle: 'Éxito',
          responseMsg: resp.message,
        });
      })
      .catch((e) => {
        const error = parseError;
        this.setState({
          modal: true,
          responseTitle: error.title,
          responseMsg: error.message,
        });
      });
  }

  render() {
    const { history, location } = this.props;
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12" xs="12" className="mt-4">
              <Row>
                <Col lg="6" md="12" sm="12" xs="12" className="container-data-input-group">
                  <div className="card p-4 mb-4">
                    <div className="data-input-group">
                      <Label>NOMBRE DE LA AGENCIA</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyName"
                          value={this.state.agencyName}
                          onChange={event =>
                            this.setState({ agencyName: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyName}</p>
                      )}
                    </div>
                    <div className="data-input-group">
                      <Label>DOMICILIO</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyAdress"
                          value={this.state.agencyAdress}
                          onChange={event =>
                            this.setState({ agencyAdress: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyAdress}</p>
                      )}
                    </div>
                    <div className="data-input-group">
                      <Label>EMAIL DE CONTACTO</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyEmail"
                          value={this.state.agencyEmail}
                          onChange={event =>
                            this.setState({ agencyEmail: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyEmail}</p>
                      )}
                    </div>
                    <div className="data-input-group">
                      <Label>TELEFONO FIJO</Label>
                      {this.state.modifyActive ? (
                        <Input
                          type="text"
                          name="agencyPhone"
                          value={this.state.agencyPhone}
                          onChange={event =>
                            this.setState({ agencyPhone: event.target.value })
                          }
                        />
                      ) : (
                        <p>{this.state.agencyPhone}</p>
                      )}
                    </div>
                    <div className="underline" />
                    {this.state.modifyActive ? (
                      <span>
                        <Button
                          color="primary"
                          className="btn-link-primary align-self-end"
                          onClick={() => this.update()}
                        >
                          <img src="/assets/images/icon-check-red.svg" alt="" />Guardar
                        </Button>
                        <Button
                          color="warning"
                          className="btn-link-danger align-self-end"
                          onClick={() => this.toggle()}
                        >
                          Cancelar
                        </Button>
                      </span>
                    ) : (
                      <Button
                        type="primary"
                        className="btn-link-primary align-self-end"
                        onClick={() => this.toggle()}
                      >
                        <img src="/assets/images/icon-edit-red.svg" alt="" />
                        Editar
                      </Button>
                    )}
                  </div>
                </Col>

                <Col lg="6" md="12" sm="12" xs="12" className="container-data-input-group">
                  <div className="card p-4 mb-4">
                    <div className="data-input-group">
                      <Label>FOTO DE PORTADA</Label> <small>(Recomendado 1440 x 360)</small>
                      <div className="col-12">
                        <ImageCrop
                          aspectRatio={16 / 4}
                          cropImage={img => this.getBannerImage(img)}
                          previewImage={this.state.previewBannerImage}
                        />
                      </div>
                    </div>

                    <div className="data-input-group">
                      <Label>MARCA DE LA AGENCIA O FOTO DE PERFIL</Label> <small>(Recomendado 265 x 175)</small>
                      <div className="col-12">
                        <ImageCrop
                          aspectRatio={85 / 53}
                          cropImage={img => this.getProfileImage(img)}
                          previewImage={this.state.previewProfileImage}
                        />
                      </div>
                    </div>

                    <div className="underline" />
                    <Button
                      type="secondary"
                      className="btn-link-primary align-self-end"
                      onClick={() => this.handleSubmit()}
                    >
                      <img src="/assets/images/icon-check-red.svg" alt="" />
                      Guardar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <ScrollToTop showUnder={320} >
            <img style={{ width: '30px' }} src="/assets/images/icon-arrow-top.svg" alt="Inicio" />
          </ScrollToTop>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.state.responseTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              <h5>{this.state.responseMsg}</h5>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleModal()}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
  },
});
const withAgencyDetail = graphql(AgencyDetailQuery, {
  name: 'agencyData',
  options,
});
const withData = compose(withAgencyDetail);
export default withData(AgencyMicrosite);
