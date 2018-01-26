/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { graphql } from 'react-apollo';
import qs from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import InfiniteScroll from 'react-infinite-scroller';
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

import ActiveFilters from '../../stories/ActiveFilters';

import { getFiltersAndTotalResult } from '../../Modules/fetches';

import style from '../../Styles/searchCars';

import photoGaleryParser from '../../Modules/photoGaleryParser';

class SearchCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      Publications: [],
      totalResults: 0,
      loading: true,
      renderedData: 0,
    };
    this.doSearch = this.doSearch.bind(this);
  }
  componentWillMount() {
    const url = this.props.location.search;
    this.doFilterTotalResultSearch(url);
    this.doSearch(1, true, this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({ renderedData: 0 });
      this.doSearch(1, true, nextProps);
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
  doSearch(page, newSearch, nextProps) {
    let url;
    if (nextProps) { url = nextProps.location.search; } else {
      url = this.props.location.search;
    }
    this.props
      .mutate({
        variables: {
          carState: qs.parse(url).carState,
          text: qs.parse(url).text,
          page,
          year: qs.parse(url).year,
          state: qs.parse(url).state,
        },
      })
      .then(({ data: { searchPublication: { Publications } } }) => {
        if (newSearch) {
          this.setState({
            Publications,
            loading: false,
            renderedData: this.state.renderedData + Publications.length,

          });
        } else {
          const existingPubs = this.state.Publications;
          Publications.map((pub) => {
            existingPubs.push(pub);
          });
          this.setState({
            Publications: existingPubs,
            loading: false,
            renderedData: this.state.renderedData + Publications.length,

          });
        }
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }
  renderData() {
    if (this.state.totalResults === 0) {
      return <p>La búsqueda no ha dado resultados, prueba con otro texto </p>;
    }
    if (this.state.loading) {
      return <p>Cargando...</p>;
    }
    return (
      <div>
        <CarResultContainer>
          {this.state.Publications.map(row => (
            <CarResult
              key={row.id}
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
    const {
      text, carState, page,
    } = qs.parse(this.props.location.search);
    const { history, location } = this.props;
    return (
      <div>
        <TopTopNav />
        <SearchBar
          text={text}
          history={history}
          location={location}
        />
        <div className="container-fluid mb-4 mt-4">
          <Row>
            <Col md="8" sm="12">
              <BreadCrum url={window.location.href} />
            </Col>
            <Col md="4" sm="12">
              <PublicityBanner />
            </Col>
          </Row>
        </div>
        <div className="container-fluid">
          <Row>
            <Col md="3" sm="12" className="sidebar-filters">
              <FiltersList filters={this.state.filters} search={this.props.location.search} history={history} />
            </Col>
            <Col md="9" sm="12">
              <Row className="header-filters align-items-center">
                <Col md="8" sm="12">
                  <NumberOfResult results={this.state.totalResults} />
                </Col>
                <Col md="4" sm="12">
                  <Row className="align-items-center">
                    <div class="col-5 text-right">
                      <p>Ordenar por</p>
                    </div>
                    <div class="col-7">
                      <Dropdown isOpen={this.state.tipoDropdown} toggle={this.toggleTipoDropdown}>
                        <DropdownToggle caret color="default" className="btn-select">
                          Menor Precio{this.state.dropDownTipoValue}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Elije una</DropdownItem>
                          <DropdownItem onClick={e => this.changeTipoValue(e)}>Menor Precio</DropdownItem>
                          <DropdownItem onClick={e => this.changeTipoValue(e)}>Destacados</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </Row>
                </Col>
              </Row>
              <ActiveFilters history={this.props.history} searchData={qs.parse(this.props.location.search)} />
              <InfiniteScroll
                pageStart={1}
                loadMore={this.doSearch}
                hasMore={this.state.renderedData < this.state.totalResults}
                loader={<img src="/loading.gif" key={0} alt="Loading..." />}
              >
                {this.renderData()}
              </InfiniteScroll>
              <br />

            </Col>
          </Row>

        </div>
        <Footer />
      </div>
    );
  }
}

export default graphql(SearchMutation)(SearchCars);
