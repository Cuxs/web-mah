import React, { Component } from "react";
import { Col, Row, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ImageCrop from "../../../stories/ImageCrop";

import { getUserToken, isAdminLogged } from "../../../Modules/sessionFunctions";
import AdminBar from "../../../stories/AdminBar";
import SuperAdminSideBar from "../../../stories/SuperAdminSideBar";
import { uploadSliders, getSliders } from "../../../Modules/fetches";

class SuperAdminSliders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1: "",
      slider2: "",
      slider3: "",
      previewSlider1: "",
      previewSlider2: "",
      previewSlider3: "",
      modal: false,
      modalTitle: "",
      modalMessage: "",
      loading: false,
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount(){
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    getSliders()
    .then((res)=>{
      this.setState({
        previewSlider1: res.data[0]? res.data[0].image: '',
        previewSlider2: res.data[1]? res.data[1].image: '',
        previewSlider3: res.data[2]? res.data[2].image: '',
      })
    })
  }
  getSlider1(img) {
    this.setState({ slider1: img });
  }
  getSlider2(img) {
    this.setState({ slider2: img });
  }
  getSlider3(img) {
    this.setState({ slider3: img });
  }
  toggle() {
    this.state.success 
    ?
    window.location.reload()
    :
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleSubmit() {
    this.setState({loading:true})
    uploadSliders(this.state).then(res => {
      this.setState({
        loading:false,
        modal:true,
        modalTitle: 'Listo!',
        modalMessage: res.message,
        success:true,
        previewSlider1: res.data[0]? res.data[0].image: '',
        previewSlider2: res.data[1]? res.data[1].image: '',
        previewSlider3: res.data[2]? res.data[2].image: '',
      })
    })
    .catch((err)=>{
      this.setState({
        loading:false,
        modal:true,
        modalTitle:'Error',
        modalMessage:err
      })
    })
  }

  render() {
    const { location, history } = this.props;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col lg="3" md="12">
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col lg="9" md="12" sm="12">
              <div className="d-flex flex-md-row flex-sm-column">
                <Col
                  lg="10"
                  md="10"
                  sm="12"
                  className="container-data-input-group mt-4"
                >
                  <div className="card p-4" style={{ height: "100%" }}>
                    <h6 className="title-division">
                      <b>Sliders</b>
                    </h6>
                    <div className="card p-4 mb-4">
                      <div className="data-input-group">
                        <Label>SLIDER 1</Label>{" "}
                        <small>(Recomendado 1280 x 256)</small>
                        <div className="col-12">
                          <ImageCrop
                            aspectRatio={1280 / 256}
                            cropImage={img => this.getSlider1(img)}
                            previewImage={this.state.previewSlider1}
                            banner
                          />
                          <Label>SLIDER 2</Label>{" "}
                          <small>(Recomendado 1280 x 256)</small>
                          <ImageCrop
                            aspectRatio={1280 / 256}
                            cropImage={img => this.getSlider2(img)}
                            previewImage={this.state.previewSlider2}
                            banner
                          />
                          <Label>SLIDER 3</Label>{" "}
                          <small>(Recomendado 1280 x 256)</small>
                          <ImageCrop
                            aspectRatio={1280 / 256}
                            cropImage={img => this.getSlider3(img)}
                            previewImage={this.state.previewSlider3}
                            banner
                          />
                        </div>
                      </div>
                      <Row>
                        <div className="col-md-8 col-sm-8 col-xs-2" >
                            
                            </div>
                        <div className="col-4">
                            <Button
                              className="btn-link-primary"
                              color="primary"
                              onClick={this.handleSubmit}
                              disabled={this.state.loading}
                            >
                              Guardar
                            </Button>
                            {this.state.loading && (
                              <img
                                style={{ height: "60px" }}
                                src="/loading.gif"
                                key={0}
                                alt="Loading..."
                              />
                            )}

                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.modalTitle}
          </ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              {this.state.modalMessage}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SuperAdminSliders;
