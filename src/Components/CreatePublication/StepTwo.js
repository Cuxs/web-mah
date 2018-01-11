/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

import AdminBar from '../../stories/AdminBar';
import ImageCrop from '../../stories/ImageCrop';

import style from '../../Styles/register';


class CreatePublication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSlider1: '',
      previewimageSlider1: '',
      imageSlider2: '',
      previewimageSlider2: '',
      imageSlider3: '',
      previewimageSlider3: '',
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      previewimageSlider1: nextProps.promotion.imageSlider1,
      previewimageSlider2: nextProps.promotion.imageSlider2,
      previewimageSlider3: nextProps.promotion.imageSlider3,
    });
  }

  getimageSlider1(img) {
    this.setState({ imageSlider1: img });
  }
  getimageSlider2(img) {
    this.setState({ imageSlider2: img });
  }
  getimageSlider3(img) {
    this.setState({ imageSlider3: img });
  }

  _handleSubmit() {
    const imageSlider1 = this.state.imageSlider1,
      imageSlider2 = this.state.imageSlider2,
      imageSlider3 = this.state.imageSlider3;

    this.props.updateSliders(
      imageSlider1,
      imageSlider2,
      imageSlider3,
    );
  }

  render() {
    return (
      <div>
        <AdminBar />
        <Row>
          <Col md="6" sm="12">
            <h4>Vendé tu auto ya!</h4>
            <h6>En muy simples pasos podés publicar tu auto.</h6>

            <h6>PASO 1</h6>
            <h4><b>Contanos de tu auto</b></h4>
            <Button color="link" >Modificar datos</Button>

            <div className="underline" />

            <h6>PASO 2</h6>
            <h4><b>Mostralo con fotos</b></h4>

          </Col>
          <Col md="4">
            <h4>¿Qué extrass tiene?</h4>

            <ImageCrop
              aspectRatio={16 / 9}
              cropImage={img => this.getimageSlider1(img)}
              
            />
            <div className="underline" />
            <Button color="primary" href="/createPublicationS3" >Siguiente</Button>
          </Col>
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default CreatePublication;
