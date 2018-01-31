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
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step">
                    <h6>PASO 2</h6>
                    <h4>Mostralo con fotos</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left">
                <h4 className="title-division">Cómo luce?</h4>
                <ImageCrop
                  aspectRatio={16 / 9}
                  cropImage={img => this.getimageSlider1(img)}

                />
                <div className="underline" />
                <Button color="primary" className="float-right" href="/createPublicationS3" >Siguiente</Button>
              </div>

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CreatePublication;
