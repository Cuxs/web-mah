
/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import qs from 'query-string';
import { animateScroll as scroll } from 'react-scroll';

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
import Banner from '../../stories/Banner';
import HeaderAgency from '../../stories/HeaderAgency';

import { getFiltersAndTotalResult } from '../../Modules/fetches';

import style from '../../Styles/searchCars';

import photoGaleryParser from '../../Modules/photoGaleryParser';

class SearchCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      data: { searchPublication: '' },
      totalResults: 0,
      activeFilters: [{ name: 'Filtro 1' }, { name: 'Filtro 2' }],
    };
  }
  componentWillMount() {
    const url = this.props.location.search;
    this.doFilterTotalResultSearch(url);
    this.doSearch(url);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.doSearch(nextProps.location.search);
      this.doFilterTotalResultSearch(nextProps.location.search);
    }
    scroll.scrollToTop({ duration: 300 });
  }
  doFilterTotalResultSearch(url) {
    getFiltersAndTotalResult(qs.parse(url))
      .then(res => this.setState({
        totalResults: res.data.totalResults,
        filters: res.data.filters,
      }));
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
    if (this.state.totalResults === 0) {
      return <p>La búsqueda no ha dado resultados, prueba con otro texto </p>;
    }
    if (this.state.data.searchPublication === '') {
      return <p>Cargando...</p>;
    }
    return (
      <div>
        <NumberOfResult results={this.state.totalResults} />
        <CarResultContainer>
          {this.state.data.searchPublication.Publications.map(row => (
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
    const { text, carState, page } = qs.parse(this.props.location.search);
    const { history, location } = this.props;
    return (
      <div>
        <TopTopNav />
        <SearchBar
          text={text}
          history={history}
          location={location}
        />
        <HeaderAgency />

      </div>
    );
  }
}

export default graphql(SearchMutation)(SearchCars);
