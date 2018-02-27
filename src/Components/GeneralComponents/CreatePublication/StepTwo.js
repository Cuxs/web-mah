/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { parse, stringify } from 'query-string';
import DropzoneComponent from 'react-dropzone-component';


import AdminBar from '../../../stories/AdminBar';
import { isAdminLogged, getUserToken } from '../../../Modules/sessionFunctions';
import { server } from '../../../Modules/params';

let myDropzone;

function initCallback(dropzone) {
  myDropzone = dropzone;
}

class CreatePublicationS2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      responseMsg: '',
      responseTitle: '',
      disabled: true,
    };
    this.toggle = this.toggle.bind(this);
  }
  disabled() {
    if (myDropzone) {
      if (myDropzone.files.length !== 0) {
        this.setState({ disabled: false });
        return false;
      }
      this.setState({ disabled: true });
      return false;
    }
    this.setState({ disabled: true });
    return false;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleSubmit() {
    myDropzone.processQueue();
  }

  render() {
    const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: `${server}/createPublication`,
    };

    const search = parse(this.props.location.search);
    const dataCarForm = {
      Caracteristics: parse(search.Caracteristics),
      TecnicalData: parse(search.TecnicalData),
      Additionals: parse(search.Additionals),
      DataCar: parse(search.DataCar),
    };
    const dataPublication = Object.assign(
      {},
      dataCarForm.Caracteristics,
      dataCarForm.TecnicalData,
      dataCarForm.Additionals,
      dataCarForm.DataCar,
    );

    const djsConfig = {
      paramName: () => 'imageGroup',
      addRemoveLinks: true,
      acceptedFiles: 'image/jpeg,image/png,image/gif',
      autoProcessQueue: false,
      maxFiles: 8,
      parallelUploads: 100,
      uploadMultiple: true,
      dictInvalidFileType: 'Formato de archivo incorrecto',
      dictRemoveFile: 'Borrar',
      dictMaxFilesExceeded: 'Solo se pueden subir hasta 8 imágenes',
      dictDefaultMessage:
        'Arrastre aquí las imágenes o haga clic para seleccionarlas.',
      dictFallbackMessage: 'Su navegador no soporta arrastrar imágenes',
      dictCancelUpload: 'Cancelar.',
      dictUploadCanceled: 'Subida cancelada.',
      dictCancelUploadConfirmation: '¿Esta seguro que desea cancelar la creación de la publicación?',
      params: dataPublication,
      headers: {
        mimeType: 'multipart/form-data',
        Authorization: getUserToken(),
      },
    };
    const eventHandlers = {
      init: (dropzone) => {
        initCallback(dropzone);
      },
      addedfile: () => {
        this.disabled();
      },
      successmultiple: (_, res) => {
        this.setState({
          modal: true,
          responseTitle: 'Éxito',
          responseMsg: res,
        });
      },
    };
    const dataCar = {
      Caracteristics: stringify(parse(search.Caracteristics)),
      TecnicalData: stringify(parse(search.TecnicalData)),
      Additionals: stringify(parse(search.Additionals)),
      DataCar: stringify(parse(search.DataCar)),
    };
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Vendé tu auto ya!</h4>
                  <p>En muy simples pasos podés publicar tu auto.</p>
                </div>

                <div className="steps">
                  <div className="step done">
                    <h6>PASO 1</h6>
                    <h4>Contanos de tu auto</h4>
                    <Button
                      className="btn btn-link-primary"
                      onClick={() =>
                        this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`)
                      }
                    >
                      Modificar datos
                    </Button>
                  </div>

                  <div className={`step ${!this.state.disabled ? 'done' : ''}`}>
                    <h6>PASO 2</h6>
                    <h4>Mostralo con fotos</h4>
                    <p className="info">* Mínimo 3 fotos</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Cómo luce?</h4>
                <DropzoneComponent
                  config={componentConfig}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig}
                />
                <div className="underline" />
                <div
                  style={{ width: '100%' }}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Button
                    color="default"
                    onClick={() =>
                      this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`)
                    }
                  >
                    Volver
                  </Button>
                  <Button
                    color="primary"
                    disabled={this.state.disabled}
                    onClick={() => this.handleSubmit()}
                  >
                    Publicar
                  </Button>
                </div>
              </div>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggleModal}>
                  {this.state.responseTitle}
                </ModalHeader>
                <ModalBody>
                  <div className="col-md-6 offset-md-3">
                    {this.state.responseMsg}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() =>
                      (isAdminLogged()
                        ? this.props.history.push('/superAdminPublications?stateName=Pendiente')
                        : this.props.history.push('/userPublications?stateName=Pendiente'))
                    }
                  >
                    OK
                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default CreatePublicationS2;
