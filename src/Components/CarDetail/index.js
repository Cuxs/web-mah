/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { parse } from 'query-string';

import { CarDetailQuery, CarSpecs } from '../../ApolloQueries/CarDetailQuery';

import TopTopNav from '../../stories/TopTopNav';
import SearchBar from '../../stories/SearchBar';
import Footer from '../../stories/Footer';
import BreadCrum from '../../stories/BreadCrum';
import PublicityBanner from '../../stories/PublicityBanner';
import CarCarousel from '../../stories/CarCarousel';
import CarSpecifications from '../../stories/CarSpecifications';

import style from '../../Styles/carDetail';
import socialStyle from '../../Styles/bootstrap-social';
import { thousands } from '../../Modules/functions';

import photoGaleryParser from '../../Modules/photoGaleryParser';
import carDetail from '../../Styles/carDetail';


const CarDetail = ({
  carDetailData, carSpecsData, history, location,
}) => (
  <div>
    <TopTopNav />
    <SearchBar history={history} location={location} />
    <div className="container-section">
      <Row>
        <Col md="7" sm="12">
          <BreadCrum url={window.location.href} />
        </Col>
        <Col md="5" sm="12">
          <PublicityBanner />
        </Col>
      </Row>
    </div>
    <div className="container-section">
      {carDetailData.Publication === null &&
        <h3>Esta publicación no exite o ha sido eliminada.</h3>
      }
      {!carDetailData.loading && carDetailData.Publication !== null && (
        <Row>
          <Col md="7" sm="12">
            <CarCarousel
              photoGalery={photoGaleryParser(carDetailData.Publication.ImageGroup)}
            />
            <div className="underline" />
            <div>
              <h5 className="title">Resumen</h5>
              <Row>
                <Col md="6" sm="12">
                  <h5>ESTADO</h5>
                  <h5>{carDetailData.Publication.carState}</h5>
                </Col>
                <Col md="6" sm="12">
                  <h5>KM</h5>
                  <h6>{thousands(carDetailData.Publication.kms, 0, ',', '.')}</h6>
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12">
                  <h5>MARCA</h5>
                  <h6>{carDetailData.Publication.brand}</h6>
                </Col>

                <Col md="6" sm="12">
                  <h5>AÑO</h5>
                  <h6>{carDetailData.Publication.year}</h6>
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12">
                  <h5>MODELO</h5>
                  <h6>{carDetailData.Publication.modelName}</h6>
                </Col>
                <Col md="6" sm="12">
                  <h5>COMBUSTIBLE</h5>
                  <h6>{carDetailData.Publication.fuel}</h6>
                </Col>
              </Row>
            </div>
            <div className="underline" />
            {!carSpecsData.loading && carSpecsData.Publication.Specifications !== null && (
            <CarSpecifications data={carSpecsData.Publication.Specifications} />
            )}
            <h5 className="title">Comentarios del Vendedor</h5>
            <h6> {carDetailData.Publication.observation}</h6>
          </Col>

          <Col md="5" sm="12">
            <h6>
              {carDetailData.Publication.year} - {thousands(carDetailData.Publication.kms, 0, ',', '.')} km
            </h6>
            <h4>{`${carDetailData.Publication.brand} ${carDetailData.Publication.group}`}</h4>
            <h6>{carDetailData.Publication.modelName}</h6>
            <h4>${thousands(carDetailData.Publication.price, 2, ',', '.')}</h4>
            <Button color="primary" carDetailData={carDetailData} >¡Solicitá tu crédito</Button>

            <div className="container-social">
              <button className="btn btn-social-icon btn-facebook">
                <span className="fa fa-facebook" />
              </button>
              <button className="btn btn-social-icon btn-twitter">
                <span className="fa fa-twitter" />
              </button>
              <button className="btn btn-social-icon btn-google">
                <span className="fa fa-google" />
              </button>
            </div>

            <div className="underline" />

            <h5>
              {carDetailData.Publication.User.agencyName || carDetailData.Publication.User.name}
            </h5>
            <Button color="link">Ver todos los autos</Button>

            <div className="container-personal-carDetailData">
              <h6>DOMICILIO</h6>
              <h6>
                {carDetailData.Publication.User.agencyAdress ||
                  carDetailData.Publication.User.address ||
                  'No especificado'}
              </h6>
              <h6>TELÉFONOS</h6>
              <h6>
                {carDetailData.Publication.User.agencyPhone && ' / '}
                {carDetailData.Publication.User.phone || 'No especificado'}{' '}
              </h6>
              <h6>EMAIL</h6>
              <h6>
                {carDetailData.Publication.User.agencyEmail ||
                  carDetailData.Publication.User.email ||
                  'No especificado'}
              </h6>
            </div>

            <FormGroup>
              <Label for="exampleText">Contactar al Vendedor</Label>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                placeholder="Escribe una consulta"
              />
            </FormGroup>
            <Button color="secondary">Preguntar</Button>
          </Col>
        </Row>
      )}
    </div>
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
      <ModalHeader toggle={this.toggle}>Tus datos para ponerte en contacto</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="exampleEmail">Nombre</Label>
          <Input type="text" name="name" id="exampleEmail" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="text" name="name" id="exampleEmail" />
        </FormGroup>
      </ModalBody>
    </Modal>
    <Footer />
    <style jsx>{style}</style>
    <style jsx>{socialStyle}</style>
  </div>
);
const options = ({ location }) => ({ variables: { id: parse(location.search).publication_id } });
const withCarDetails = graphql(CarDetailQuery, { name: 'carDetailData', options });
const withSpecs = graphql(CarSpecs, { name: 'carSpecsData', options });
const withData = compose(
  withSpecs,
  withCarDetails,
);
const CarDetailwithData = withData(CarDetail);

export default (CarDetailwithData);
