/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row } from 'reactstrap';

import SearchQuery from '../../ApolloQueries/SearchQuery';

import TopTopNav from '../../stories/TopTopNav';
import SearchBar from '../../stories/SearchBar';
import Footer from '../../stories/Footer';
import BreadCrum from '../../stories/BreadCrum';
import PublicityBanner from '../../stories/PublicityBanner';
import FiltersList from '../../stories/FiltersList';
import CarResultContainer from '../../stories/CarResultContainer';
import CarResult from '../../stories/CarResult';

import style from '../../Styles/searchCars';

import photoGaleryParser from '../../Modules/photoGaleryParser';


const SearchCars = ({ data }) => (
  <div>
    <TopTopNav />
    <SearchBar />
    <div className="container-section" >
      <Row>
        <Col md="8" sm="12">
          <BreadCrum url="https://miautohoy.com/admin/cars" />
        </Col>
        <Col md="4" sm="12">
          <PublicityBanner />
        </Col>
      </Row>
    </div>
    <div className="container-section" >
      <Row>
        <Col md="3" sm="12">
          <FiltersList filters={[
            { title: 'Tipo de Vendedor', options: [{ name: 'Agencia', quantity: 1543 }, { name: 'Sólo Dueño', quantity: 2345 }] },
            { title: 'Tipo de Vehículo', options: [{ name: 'Usado', quantity: 3338 }, { name: 'Nuevo', quantity: 1200 }] },
            { title: 'Modelo', options: [{ name: 'Palio', quantity: 143 }, { name: 'Siena', quantity: 98 }] },
            { title: 'Año', options: [{ name: '1991 a 2005', quantity: 43 }, { name: '2006 a 2018', quantity: 158 }] },
            ]}
          />
        </Col>
        {!data.loading &&
          <Col md="9" sm="12">
            <CarResultContainer>
              {data.AllPublications.map(row => (
                <CarResult photoGalery={photoGaleryParser(row.ImageGroup)} data={row} {...{ [row.State]: true }} />))
              }
            </CarResultContainer>
          </Col>
        }
      </Row>
    </div>
    <Footer />
    <style jsx>{style}</style>
  </div>
);

export default SearchQuery(SearchCars);
