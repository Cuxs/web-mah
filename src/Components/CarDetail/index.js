/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { parse } from 'query-string';

import {
  CarDetailQuery,
  CarSpecs,
  CommentThreadQuery,
} from '../../ApolloQueries/CarDetailQuery';

import TopTopNav from '../../stories/TopTopNav';
import SearchBar from '../../stories/SearchBar';
import Footer from '../../stories/Footer';
import BreadCrum from '../../stories/BreadCrum';
import PublicityBanner from '../../stories/PublicityBanner';
import CarCarousel from '../../stories/CarCarousel';
import CarSpecifications from '../../stories/CarSpecifications';
import MessageCarDetail from '../../stories/MessagesCarDetail';

import style from '../../Styles/carDetail';
import socialStyle from '../../Styles/bootstrap-social';

import { thousands } from '../../Modules/functions';
import photoGaleryParser from '../../Modules/photoGaleryParser';
import { getUserDataFromToken } from '../../Modules/sessionFunctions';

class CarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  render() {
    const {
      carDetailData,
      carSpecsData,
      commentThreadData,
      history,
      location,
    } = this.props;
    return (
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
          {carDetailData.Publication === null && (
          <h3>Esta publicación no exite o ha sido eliminada.</h3>
      )}
          {!carDetailData.loading &&
        carDetailData.Publication !== null && (
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
                    <h6>
                      {thousands(carDetailData.Publication.kms, 0, ',', '.')}
                    </h6>
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
              {!carSpecsData.loading &&
                carSpecsData.Publication.Specifications !== null && (
                  <CarSpecifications
                    data={carSpecsData.Publication.Specifications}
                  />
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
              <Button color="primary">¡Solicitá tu crédito</Button>
              <div className="container-social">
                <button className="btn btn-social-icon btn-facebook">
                  <span className="fa fa-facebook" />
                </button>
                <button className="btn btn-social-icon btn-twitter">
                  <span className="fa fa-twitter" />
                </button>
                <button className="btn btn-social-icon btn-instagram">
                  <span className="fa fa-instagram" />
                </button>
                <button className="btn btn-social-icon btn-google">
                  <span className="fa fa-google" />
                </button>
              </div>

              <div className="underline" />

              <h5>
                {carDetailData.Publication.User.agencyName ||
                  carDetailData.Publication.User.name}
              </h5>
              {carDetailData.Publication.User.agencyName && <Button color="link">Ver todos los autos</Button>}

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
                  {carDetailData.Publication.User.phone ||
                    'No especificado'}{' '}
                </h6>
                <h6>EMAIL</h6>
                <h6>
                  {carDetailData.Publication.User.agencyEmail ||
                    carDetailData.Publication.User.email ||
                    'No especificado'}
                </h6>
              </div>
              {getUserDataFromToken().id !==
                carDetailData.Publication.User.id &&
                  <MessageCarDetail
                    commentThread_id={commentThreadData.CommentThread ? commentThreadData.CommentThread.id : null}
                    location={location}
                    history={history}
                    publicationUserId={carDetailData.Publication.User.id}
                    publicationId={parse(location.search).publication_id}
                  />
                }
              {getUserDataFromToken().id ===
                carDetailData.Publication.User.id && (
                <Button color="secondary">Editar Publicación</Button>
              )}
            </Col>
          </Row>
        )}
        </div>
       
        <Footer />
        <style jsx>{style}</style>
        <style jsx>{socialStyle}</style>
      </div>
    );
  }
}
const options = ({ location, commentThreadData }) => ({
  variables: {
    id: parse(location.search).publication_id,
    publication_id: parse(location.search).publication_id,
    user_id: getUserDataFromToken().id,
    chatToken: parse(location.search).chatToken,
    commentThread_id:
      commentThreadData && !commentThreadData.loading
        ? commentThreadData.CommentThread.id
        : null,
  },
});
const withCarDetails = graphql(CarDetailQuery, {
  name: 'carDetailData',
  options,
});

const withSpecs = graphql(CarSpecs, { name: 'carSpecsData', options });
const withCommentThread = graphql(CommentThreadQuery, {
  name: 'commentThreadData',
  options,
});

const withData = compose(withSpecs, withCarDetails, withCommentThread);
const CarDetailwithData = withData(CarDetail);

export default CarDetailwithData;
