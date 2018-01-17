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
    
        <Row>
          <Col md="3">
            <AdminSideBar history={this.props.history} />
          </Col>
          <Col md="9">
            <Row>
              <Col md="5">
                <h6><b>NOMBRE DE LA AGENCIA</b></h6>
                <h4>Manzur Automotores</h4>
                <h6><b>EMAIL DE CONTACTO</b></h6>
                <h4>rodrigo@gmail.com</h4>
                <h6><b>TELEFONO FIJO</b></h6>
                <h4>33987654</h4>
                <h6><b>DOMICILIO</b></h6>
                <h4>Palero 20, Ciudad, Mendoza.</h4>
                <h6><b>TELEFONO DE CONTACTO</b></h6>
                <h4>261-5951833</h4>
                <Button type="secondary">Modificar</Button>
              </Col>
              <Col md="5">
                <Label for="exampleEmail">FOTO DE PORTADA</Label>
                <ImageCrop
                  aspectRatio={16 / 9}
                  cropImage={img => this.getimageSlider1(img)}
                />
                <Label for="exampleEmail">MARCA DE LA AGENCIA O FOTO DE PERFIL</Label>
                <ImageCrop
                  aspectRatio={16 / 9}
                  cropImage={img => this.getimageSlider2(img)}
                />
                <Button type="secondary">Guardar</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default AgencyMicrosite;
