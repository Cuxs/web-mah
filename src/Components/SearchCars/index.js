/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { graphql } from 'react-apollo';
import _ from 'lodash';

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
import resultCounter from '../../Modules/resultCounter';


class SearchCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: [{ name: 'Filtro 1' }, { name: 'Filtro 2' }],
    };
  }
  render() {
    return (
      <div>
        <TopTopNav />
        <SearchBar />
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
          <Row>
            <Col md="3" sm="12">
              {this.state.activeFilters.map(filter => (
                <Button style={{ cursor: 'pointer' }} name={filter.name} onClick={(e) => { this.setState({ activeFilters: _.filter(this.state.activeFilters, f => (e.target.name !== f.name)) }); }}> {filter.name} </Button>
            ))}
              <FiltersList filters={[
            { title: 'Tipo de Vehículo', options: [{ name: 'Usado', quantity: resultCounter(this.props.data.AllPublications, 'carState', 'Usado') }, { name: 'Nuevo', quantity: resultCounter(this.props.data.AllPublications, 'carState', 'Nuevo') }] },
            { title: 'Combustible', options: [{ name: 'Nafta', quantity: resultCounter(this.props.data.AllPublications, 'fuel', 'Nafta') }, { name: 'Diesel', quantity: resultCounter(this.props.data.AllPublications, 'fuel', 'Diesel') }, { name: 'GNC', quantity: resultCounter(this.props.data.AllPublications, 'fuel', 'GNC') }] },
            ]}
              />
            </Col>
            {!this.props.data.loading &&
            <Col md="9" sm="12">
              <CarResultContainer>
                {this.props.data.AllPublications.map(row => (
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
  }
}

export default graphql(SearchQuery, {
  options: ({
    seller, carState, year, model, priceRange, fuel, concesionaria,
  }) => ({
    variables: {
      seller, carState, model, year, priceRange, fuel, concesionaria,
    },
  }),
})(SearchCars);
