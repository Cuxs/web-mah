/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import AdminSideBar from '../../stories/AdminSideBar';
import ImageCrop from '../../stories/ImageCrop';


import style from '../../Styles/pledgeCredits';

class AgencyMicrosite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSlider1: '',
      previewimageSlider1: '',
      imageSlider2: '',
      previewimageSlider2: '',
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      previewimageSlider1: nextProps.promotion.imageSlider1,
      previewimageSlider2: nextProps.promotion.imageSlider2,
    });
  }

  getimageSlider1(img) {
    this.setState({ imageSlider1: img });
  }

  getimageSlider2(img) {
    this.setState({ imageSlider2: img });
  }

  render() {
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div class="container-fluid">
          <Row>
            <Col md="3">
              <AdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col md="9" className="mt-4">
              <Row>
                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{height:`100%`}}>
                    <div className="data-input-group">
                      <label>NOMBRE DE LA AGENCIA</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>DOMICILIO</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>EMAIL DE CONTACTO</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>TELEFONO DE CONTACTO</label>
                      <p>xxx</p>
                    </div>
                    <div className="data-input-group">
                      <label>TELEFONO FIJO</label>
                      <p>xxx</p>
                    </div>
                    <div class="underline"></div>
                    <Button type="primary" className="btn-link-primary align-self-end">
                      <img src="/assets/images/icon-edit-red.svg" alt="" />
                      Editar
                    </Button>
                  </div>
                </Col>

                <Col md="6" className="container-data-input-group">
                  <div className="card p-4" style={{height:`100%`}}>
                    <div className="data-input-group">
                      <label>FOTO DE PORTADA</label>
                      <div class="col-12">
                        <ImageCrop
                          aspectRatio={16 / 9}
                          cropImage={img => this.getimageSlider1(img)}
                        />
                      </div>
                    </div>

                    <div className="data-input-group">
                      <label>MARCA DE LA AGENCIA O FOTO DE PERFI</label>
                      <div class="col-12">
                        <ImageCrop
                          aspectRatio={16 / 9}
                          cropImage={img => this.getimageSlider2(img)}
                        />
                      </div>
                    </div>

                    <div class="underline"></div>
                    <Button type="secondary" className="btn-link-primary align-self-end">
                      <img src="/assets/images/icon-check-red.svg" alt="" />
                      Guardar
                    </Button>
                  </div>

                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AgencyMicrosite;
