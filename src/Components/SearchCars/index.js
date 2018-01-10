/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import qs from 'query-string';

import SearchMutation from '../../ApolloQueries/SearchMutation';

import Footer from '../../stories/Footer';
import BreadCrum from '../../stories/BreadCrum';
import PublicityBanner from '../../stories/PublicityBanner';
import FiltersList from '../../stories/FiltersList';
import CarResultContainer from '../../stories/CarResultContainer';
import CarResult from '../../stories/CarResult';
import SearchBar from '../../stories/SearchBar';
import TopTopNav from '../../stories/TopTopNav';
import NumberOfResult from '../../stories/NumberOfResult';

import style from '../../Styles/searchCars';

import photoGaleryParser from '../../Modules/photoGaleryParser';
import resultCounter from '../../Modules/resultCounter';

class SearchCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { searchPublication: '' },
      activeFilters: [{ name: 'Filtro 1' }, { name: 'Filtro 2' }],
    };
  }
  componentWillMount() {
    this.doSearch(this.props.location.search);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.doSearch(nextProps.location.search);
    }
  }
  doSearch(url) {
    this.props
      .mutate({
        variables: qs.parse(url),
      })
      .then(({ data }) => {
        this.setState({
          data,
        });
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }
  renderData() {
    if (this.state.data.searchPublication.length === 0) {
      return <p>La búsqueda no ha dado resultados, prueba con otro texto </p>;
    }
    if (this.state.data.searchPublication === '') {
      return <p>Cargando...</p>;
    }
    return (
        <div>
          <NumberOfResult results={this.state.data.searchPublication.length} />
          <CarResultContainer>
            {this.state.data.searchPublication.map(row => (
              <CarResult
                photoGalery={photoGaleryParser(row.ImageGroup)}
                data={row}
                {...{ [row.State]: true }}
              />
        ))}
          </CarResultContainer>
        </div>
    );
  }

  render() {
    const data = this.state.data.searchPublication;
    const { text } = qs.parse(this.props.location.search);
    return (
      <div>
        <TopTopNav />
        <SearchBar
          text={text}
          history={this.props.history}
          location={this.props.location}
        />
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
          <Row>
            <Col md="3" sm="12">
              {this.state.activeFilters.map(filter => (
                <Button
                  style={{ cursor: 'pointer' }}
                  name={filter.name}
                  onClick={(e) => {
                    this.setState({
                      activeFilters: _.filter(
                        this.state.activeFilters,
                        f => e.target.name !== f.name,
                      ),
                    });
                  }}
                >
                  {' '}
                  {filter.name}{' '}
                </Button>
              ))}
              <FiltersList
                filters={[
                  {
                    title: 'Combustible',
                    options: [
                      {
                        name: 'Nafta',
                        quantity: resultCounter(data, 'fuel', 'Nafta'),
                      },
                      {
                        name: 'Diesel',
                        quantity: resultCounter(data, 'fuel', 'Diesel'),
                      },
                      {
                        name: 'GNC',
                        quantity: resultCounter(data, 'fuel', 'GNC'),
                      },
                    ],
                  },
                ]}
              />
            </Col>
            <Col md="9" sm="12">
              {this.renderData()}
            </Col>
          </Row>
        </div>
        <Footer />
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default graphql(SearchMutation)(SearchCars);
