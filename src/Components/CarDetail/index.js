/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { parse } from 'query-string';
import _ from 'lodash';

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

//import style from '../../Styles/carDetail';
//import socialStyle from '../../Styles/bootstrap-social';

import { thousands } from '../../Modules/functions';
import photoGaleryParser from '../../Modules/photoGaleryParser';
import {
  getUserToken,
  getUserDataFromToken,
} from '../../Modules/sessionFunctions';

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
        <div className="container-fluid">
          <Row>
            <Col md="7" sm="12">
              <BreadCrum url={window.location.href} />
            </Col>
            <Col md="5" sm="12">
              <PublicityBanner />
            </Col>
          </Row>
        </div>
        <div className="container-fluid">
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

                  <div className="container-data-input-group">
                    <h5 className="title">Resumen</h5>
                    <Row>
                      <Col md="6" sm="12">
                        <div class="data-input-group">
                          <label>ESTADO</label>
                          <p>{carDetailData.Publication.carState}</p>
                        </div>
                      </Col>
                      <Col md="6" sm="12">
                        <div class="data-input-group">
                          <label>KM</label>
                          <p>{thousands(
                            carDetailData.Publication.kms,
                            0,
                            ',',
                            '.',
                          )}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" sm="12">
                        <div class="data-input-group">
                          <label>MARCA</label>
                          <p>{carDetailData.Publication.brand}</p>
                        </div>
                      </Col>
                      <Col md="6" sm="12">
                        <div class="data-input-group">
                          <label>AÑO</label>
                          <p>{carDetailData.Publication.year}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" sm="12">
                        <div class="data-input-group">
                          <label>MODELO</label>
                          <p>{carDetailData.Publication.modelName}</p>
                        </div>
                      </Col>
                      <Col md="6" sm="12">
                        <div class="data-input-group">
                          <label>COMBUSTIBLE</label>
                          <p>{carDetailData.Publication.fuel}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>


                  {!carSpecsData.loading &&
                    carSpecsData.Publication.Specifications !== null && (
                      <CarSpecifications
                        data={carSpecsData.Publication.Specifications}
                      />
                    )}

                  <div class="container-data-input-group">
                    <div className="data-input-group">
                      <h5>Comentarios del Vendedor</h5>
                      <p>{carDetailData.Publication.observation}</p>
                    </div>
                  </div>

                </Col>
                <Col md="5" sm="12" className="sheet sheet-min">
                  <div className="item-data">
                    <small className="item-year">{carDetailData.Publication.year} -{' '}
                    {thousands(carDetailData.Publication.kms, 0, ',', '.')} km</small>
                    <p className="item-name"><strong>{`${carDetailData.Publication.brand} ${
                    carDetailData.Publication.group
                      }`}
                    </strong></p>
                    <p className="item-description">
                      {carDetailData.Publication.modelName}
                    </p>
                    <p className="item-price"><strong>${thousands(carDetailData.Publication.price, 2, ',', '.')}</strong></p>
                  </div>



                  <Button color="primary">¡Solicitá tu crédito</Button>

                  <div className="container-social">
                    <button className="btn btn-social-icon">
                      <img src="/assets/images/icon-facebook.svg" />
                    </button>
                    <button className="btn btn-social-icon">
                      <img src="/assets/images/icon-twitter.svg" />
                    </button>
                  </div>


                  <div className="container-data-input-group">
                    <h5>
                      {carDetailData.Publication.User.agencyName ||
                        carDetailData.Publication.User.name}
                    </h5>

                    {carDetailData.Publication.User.agencyName && (
                      <Button color="link">Ver todos los autos</Button>
                    )}
                    <div class="data-input-group">
                      <label>DOMICILIO</label>
                      <p>
                        {carDetailData.Publication.User.agencyAdress ||
                          carDetailData.Publication.User.address ||
                          'No especificado'}
                      </p>
                    </div>

                    <div class="data-input-group">
                      <label>TELÉFONOS</label>
                      <p>
                        {carDetailData.Publication.User.agencyPhone && ' / '}
                        {carDetailData.Publication.User.phone ||
                          'No especificado'}{' '}
                      </p>
                    </div>

                    <div class="data-input-group">
                      <label>EMAIL</label>
                      <p>
                        {carDetailData.Publication.User.agencyEmail ||
                          carDetailData.Publication.User.email ||
                          'No especificado'}
                      </p>
                    </div>

                    <div class="data-input-group">
                      <h5>Consultas</h5>
                      <div class="form-group">
                        <textarea name="" id="" cols="30" rows="5" class="form-control" placeholder="Dejános tu consulta..."></textarea>
                      </div>
                      <div class="form-group">
                        <div class="btn btn-secondary btn-lg">PREGUNTAR</div>
                      </div>
                    </div>
                  </div>
                  {getUserDataFromToken().id !==
                    carDetailData.Publication.User.id &&
                    !commentThreadData.loading && (
                      <MessageCarDetail
                        commentThread_id={
                          (commentThreadData.CommentThread && !_.isEmpty(commentThreadData.CommentThread))
                            ? commentThreadData.CommentThread[0].id
                            : null
                        }
                        location={location}
                        history={history}
                        publicationUserId={carDetailData.Publication.User.id}
                        publicationId={parse(location.search).publication_id}
                      />
                    )}
                  {getUserDataFromToken().id ===
                    carDetailData.Publication.User.id && (
                    <Button color="secondary">Editar Publicación</Button>
                  )}
                </Col>
              </Row>
            )}
        </div>

        <Footer />

      </div>
    );
  }
}
const options = ({ location, commentThreadData }) => ({
  variables: {
    id: parse(location.search).publication_id,
    publication_id: parse(location.search).publication_id,
    MAHtokenP1: getUserToken(),
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
