/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Button, FormGroup, Input, Label } from 'reactstrap';
import { graphql } from 'react-apollo';
import CarDetailQuery from '../../ApolloQueries/CarDetailQuery';

import TopTopNav from '../../stories/TopTopNav';
import SearchBar from '../../stories/SearchBar';
import Footer from '../../stories/Footer';
import BreadCrum from '../../stories/BreadCrum';
import PublicityBanner from '../../stories/PublicityBanner';
import CarCarousel from '../../stories/CarCarousel';
import CarSpecifications from '../../stories/CarSpecifications';

import style from '../../Styles/carDetail';

import photoGaleryParser from '../../Modules/photoGaleryParser';


const CarDetail = ({ data, history, location }) => (
  <div>
    <TopTopNav />
    <SearchBar history={history} location={location} />
    <div className="container-section" >
      <Row>
        <Col md="7" sm="12">
          <BreadCrum url={window.location.href} />
        </Col>
        <Col md="5" sm="12">
          <PublicityBanner />
        </Col>
      </Row>
    </div>
    <div className="container-section" >
      {!data.loading &&
        <Row>
          <Col md="7" sm="12">
            <CarCarousel photoGalery={photoGaleryParser(data.Publication.ImageGroup)} />


            <div className="underline" />
            <div>
              <h5 className="title" >Resumen</h5>
              <Row>
                <Col md="6" sm="12">
                {console.log(data)}
                <h7>ESTADO</h7>
                <h6>{data.Publication.carState}</h6>
              </Col>
                <Col md="6" sm="12">
                <h7>KM</h7>
                <h6>{data.Publication.kms}</h6>
              </Col>
              </Row>
              <Row>
                <Col md="6" sm="12">
                <h7>MARCA</h7>
                <h6>{data.Publication.brand}</h6>
              </Col>

                <Col md="6" sm="12">
                <h7>AÑO</h7>
                <h6>{data.Publication.year}</h6>
              </Col>
              </Row>
              <Row>
                <Col md="6" sm="12">
                <h7>MODELO</h7>
                <h6>{data.Publication.modelName}</h6>
              </Col>

                <Col md="6" sm="12">
                <h7>COMBUSTIBLE</h7>
                <h6>{data.Publication.fuel}</h6>
              </Col>
              </Row>
            </div>
            <div className="underline" />
            <CarSpecifications
              groups={[
              {
                title: 'Extras',
                specifications: [
                { name: 'Aire Acondicionado', state: true },
                { name: 'Alarma', state: true },
                { name: 'Asiento rebatible', state: false },
                { name: 'Aire', state: true },
                ],
              },
              {
                title: 'Seguridad',
                specifications: [
                { name: 'Airbag', state: true },
                { name: 'Cierre automáico', state: true },
                { name: 'Faros antiniebla', state: false },
                { name: 'Sensor de estacionamiento', state: false },
                ],
              },
              {
                title: 'Audio/Multimedia',
                specifications: [
                { name: 'Bluetooth', state: false },
                { name: 'Entrada auxiliar', state: true },
                { name: 'Manos libres', state: false },
                ],
              },
            ]}
            />

            <h5 className="title" >Comentarios del Vendedor</h5>
            <h6> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
            Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
            cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una
            galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
            </h6>
          </Col>

          <Col md="5" sm="12">
            <h6>{data.Publication.year} - {data.Publication.kms} km</h6>
            <h4>{data.Publication.group}</h4>
            <h6>{data.Publication.modelName}</h6>
            <h4>${data.Publication.price}</h4>
            <Button color="primary">¡Solicitá tu crédito</Button>

            <div className="container-social" >
              <Button color="default">f</Button>
              <Button color="default">t</Button>
              <Button color="default">G</Button>
            </div>

            <div className="underline" />

            <h5>Nombre de la agencia</h5>
            <Button color="link">Ver todos los autos</Button>

            <div className="container-personal-data" >
              <h7>DOMICILIO</h7>
              <h7>Av. Mitre 1458 San Rafael, Mendoza</h7>
              <h7>TELÉFONOS</h7>
              <h7>2604-4337724 / 2604-4337724</h7>
              <h7>EMAIL</h7>
              <h7>automoteres@gmail.com</h7>
            </div>

            <FormGroup>
              <Label for="exampleText">Contactar al Consecionario</Label>
              <Input type="textarea" name="text" id="exampleText" placeholder="Escribe una consulta" />
            </FormGroup>
            <Button color="secondary">Preguntar</Button>

          </Col>
        </Row>
        }
    </div>
    <Footer />
    <style jsx>{style}</style>
  </div>
);

export default graphql(CarDetailQuery, { options: { variables: { id: 1 } } })(CarDetail);
