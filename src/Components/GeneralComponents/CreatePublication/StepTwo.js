/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import { parse, stringify } from 'query-string';

import AdminBar from '../../../stories/AdminBar';
import ImageCrop from '../../../stories/ImageCrop';
import { createPublication } from '../../../Modules/fetches';


class CreatePublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image1: '',
      previewimage1: '',
      image2: '',
      previewimage2: '',
      image3: '',
      previewimage3: '',
      image4: '',
      previewimage4: '',
      image5: '',
      previewimage5: '',
      image6: '',
      previewimage6: '',
      image7: '',
      previewimage7: '',
      image8: '',
      previewimage8: '',
      modal: false,
      responseMsg: '',
      responseTitle: '',
      more: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      previewimage1: nextProps.promotion.image1,
      previewimage2: nextProps.promotion.image2,
      previewimage3: nextProps.promotion.image3,
      previewimage4: nextProps.promotion.image4,
      previewimage5: nextProps.promotion.image5,
      previewimage6: nextProps.promotion.image6,
      previewimage7: nextProps.promotion.image7,
      previewimage8: nextProps.promotion.image8,
    });
  }

  disabled(){
    return !(this.state.image1 !== '' && this.state.image2 !== '' && this.state.image3 !== '');
  }

  getimage1(img) {
    if (this.state.image1 !== '' || this.state.image2 !== '' || this.state.image3 !== '') {
      return this.setState({ image1: img, done: true });
    }
    this.setState({ image1: img });
  }
  getimage2(img) {
    if (this.state.image1 !== '' || this.state.image2 !== '' || this.state.image3 !== '') {
      return this.setState({ image2: img, done: true });
    }
    this.setState({ image2: img });
  }
  getimage3(img) {
    if (this.state.image1 !== '' || this.state.image2 !== '' || this.state.image3 !== '') {
      return this.setState({ image3: img, done: true });
    }
    this.setState({ image3: img });
  }
  getimage4(img) {
    this.setState({ image4: img });
  }
  getimage5(img) {
    this.setState({ image5: img });
  }
  getimage6(img) {
    this.setState({ image6: img });
  }
  getimage7(img) {
    this.setState({ image7: img });
  }
  getimage8(img) {
    this.setState({ image8: img });
  }

  _handleSubmit() {
    const {
      image1, image2, image3, image4, image5, image6, image7, image8,
    } = this.state;

    this.props.updateSliders(
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
    );
  }

  createPub() {
    const {
      image1, image2, image3, image4, image5, image6, image7, image8,
    } = this.state;
    const search = parse(this.props.location.search);
    const dataCar = {
      Caracteristics: parse(search.Caracteristics),
      TecnicalData: parse(search.TecnicalData),
      Additionals: parse(search.Additionals),
      DataCar: parse(search.DataCar),
      Image: { imageGroup : [image1, image2, image3, image4, image5, image6, image7, image8]},
    };
    const dataPublication = Object.assign({}, dataCar.Caracteristics, dataCar.TecnicalData, dataCar.Additionals, dataCar.DataCar)
    
    createPublication(dataPublication, dataCar.Image)
      .then((resp) => {
        console.log(resp)
        this.setState({
          modal: true,
          responseTitle: 'Éxito',
          responseMsg: resp.message,
        });
      })
      .catch((error) => {
        this.setState({
          modal: true,
          responseTitle: error.title,
          responseMsg: error.message,
        });
      });
  }

  render() {
    console.log(this.state)
    const search = parse(this.props.location.search);
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
                    <Button className="btn btn-link-primary" onClick={() => this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`)}>Modificar datos</Button>
                  </div>

                  <div className={`step ${this.state.done ? 'done' : ''}`} >
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
                <ImageCrop
                  aspectRatio={160 / 106}
                  cropImage={img => this.getimage1(img)}
                  previewImage={this.state.previewimage1}
                />
                <ImageCrop
                  aspectRatio={160 / 106}
                  cropImage={img => this.getimage2(img)}
                  previewImage={this.state.previewimage2}
                />
                <ImageCrop
                  aspectRatio={160 / 106}
                  cropImage={img => this.getimage3(img)}
                  previewImage={this.state.previewimage3}
                />
                <div style={{ paddingBottom: '30px' }} >
                  <Button color="link" className={`link-more float-right ${this.state.more ? 'more-crops' : ''}`} onClick={() => this.setState({ more: true })} >+ Más fotos</Button>
                </div>
                <div className={this.state.more ? '' : 'more-crops'}>
                  <ImageCrop
                    aspectRatio={160 / 106}
                    cropImage={img => this.getimage4(img)}
                    previewImage={this.state.previewimage4}
                  />
                  <ImageCrop
                    aspectRatio={160 / 106}
                    cropImage={img => this.getimage5(img)}
                    previewImage={this.state.previewimage5}
                  />
                  <ImageCrop
                    aspectRatio={160 / 106}
                    cropImage={img => this.getimage6(img)}
                    previewImage={this.state.previewimage6}
                  />
                  <ImageCrop
                    aspectRatio={160 / 106}
                    cropImage={img => this.getimage7(img)}
                    previewImage={this.state.previewimage7}
                  />
                  <ImageCrop
                    aspectRatio={160 / 106}
                    cropImage={img => this.getimage8(img)}
                    previewImage={this.state.previewimage8}
                  />
                </div>
                <div className="underline" />
                <div style={{ width: '100%' }} className="d-flex justify-content-between align-items-center" >
                  <Button color="default" onClick={() => this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`)}>Volver</Button>
                  <Button color="primary" disabled={this.disabled()} onClick={() => this.createPub()} >Publicar</Button>
                </div>
              </div>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggleModal}>{this.state.responseTitle}</ModalHeader>
                <ModalBody>
                  <div className="col-md-6 offset-md-3">{this.state.responseMsg}</div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => this.props.history.push('/userPublications')} >OK</Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CreatePublication;
