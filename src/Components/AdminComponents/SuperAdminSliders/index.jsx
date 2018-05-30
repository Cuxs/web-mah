import React, { Component, Fragment } from "react";
import {
  Col,
  Row,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ImageCrop from "../../../stories/ImageCrop";
import { Notification } from 'react-notification';


import { getUserToken, isAdminLogged } from "../../../Modules/sessionFunctions";
import AdminBar from "../../../stories/AdminBar";
import SuperAdminSideBar from "../../../stories/SuperAdminSideBar";
import { uploadSliders, getSliders, deleteSlider } from "../../../Modules/fetches";

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
    this.eraseSlider = this.eraseSlider.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push("/loginAdmin");
    }
    getSliders().then(res => {
      res.data.map((row)=>{
        const sliderImage = `previewSlider${row.id}`
        this.setState({[sliderImage]: row.image})
      })
    });
  }
  getSlider(img) {
    return (number)=>{
      const sliderToModify = `slider${number}`;
      this.setState({ [sliderToModify]: img });
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggleNotification() {
    this.setState({
      notification: !this.state.notification
    });
  }
  handleSubmit(i) {
    this.setState({ loading: true });
    const sliderToSubmit = `slider${i}`
    uploadSliders(this.state[sliderToSubmit], i)
      .then(res => {
        this.setState({
          loading: false,
          notification: true,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          modal: true,
          modalTitle: "Error",
          modalMessage: err.toString()
        });
      });
  }
  eraseSlider(number){
    this.setState({ loading: true });    
    deleteSlider(number)
    .then(res => {
      const sliderDeletedFile = `slider${number}`
      const sliderDeleted = `previewSlider${number}`
      this.setState({
        [sliderDeleted]: 'erased',
        [sliderDeletedFile]: '',
        loading: false,
        notification: true,
      });
    })
    .catch(err => {
      this.setState({
        loading: false,
        modal: true,
        modalTitle: "Error",
        modalMessage: err.toString()
      });
    });
  }
  renderCroppers(number) {
    const numberFor = number + 1;
    const cropperArray = [];
    for (let i = 1; i < numberFor; i++) {
      const previewSliderNumber = `previewSlider${i}`;
      const sliderFile = `slider${i}`;
      cropperArray.push(
        <Fragment key={i}>
          <Label>SLIDER {i} </Label>
          <small> (Recomendado 1280 x 256)</small>
          <div className="col-12">
            <ImageCrop
              aspectRatio={1280 / 256}
              cropImage={img => this.getSlider(img)(i)}
              previewImage={this.state[previewSliderNumber]}
              banner
            />
            <Row>
              <div className="col-12 d-flex justify-content-end">
              {this.state.loading && (
                  <img
                    style={{ height: "60px" }}
                    src="/loading.gif"
                    key={0}
                    alt="Loading..."
                  />
                )}
                <Button
                  className="btn-link-primary"
                  color="primary"
                  disabled={this.state.loading}
                  onClick={()=>this.eraseSlider(i)}
                  
                >
                  Borrar
                </Button>
                <Button
                  className="btn-link-primary"
                  color="primary"
                  onClick={()=>this.handleSubmit(i)}
                  disabled={this.state.loading  || this.state[sliderFile] ===''}
                >
                  Guardar
                </Button>
              
            </div>                
            </Row>
          </div>
        </Fragment>
      );
    }
    return cropperArray;
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
                      <div className="data-input-group">
                        {this.renderCroppers(3)}
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
        <Notification
            isActive={this.state.notification}
            message={'Cambios guardados'}
            dismissAfter={3500}
            onDismiss={this.toggleNotification}
            onClick={() => this.setState({ notification: false })}
          />
      </div>
    );
  }
}

export default SuperAdminSliders;
