/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import {
  Button,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { graphql } from 'react-apollo';
import qs from 'query-string';
import _ from 'lodash';
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
      dropDownOrderValue: '. . .',
    };
    this.doSearch = this.doSearch.bind(this);
    this.changeOrderValue = this.changeOrderValue.bind(this);
    this.toggleOrderDropdown = this.toggleOrderDropdown.bind(this);
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
          fuel: qs.parse(url).fuel,
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

  toggleOrderDropdown() {
    this.setState({
      OrderDropdown: !this.state.OrderDropdown,
    });
  }
  changeOrderValue(e) {
    this.setState({ dropDownOrderValue: _.truncate(e.currentTarget.textContent, { length: 20 }) });
    switch (e.target.value) {
      case '1': {
        this.setState({
          Publications: _.orderBy(this.state.Publications, ['price'], ['asc']),
        });
        break;
      }
      case '2': {
        this.setState({
          Publications: _.orderBy(this.state.Publications, ['price'], ['desc']),
        });
        break;
      }
      case '3': {
        const partition = _.partition(this.state.Publications, p => p.CurrentState.stateName === 'Destacada');
        this.setState({
          Publications: _.concat(partition[0], partition[1]),
        });
        break;
      }
      case '4': {
        const partition = _.partition(this.state.Publications, p => p.CurrentState.stateName === 'Apto para garantía');
        this.setState({
          Publications: _.concat(partition[0], partition[1]),
        });
        break;
      }
      case '5': {
        this.setState({
          Publications: _.orderBy(this.state.Publications, ['createdAt'], ['desc']),
        });
        break;
      }
      case '6': {
        this.setState({
          Publications: _.orderBy(this.state.Publications, ['year'], ['desc']),
        });
        break;
      }
      case '7': {
        this.setState({
          Publications: _.orderBy(this.state.Publications, ['year'], ['asc']),
        });
        break;
      }
      default:
        return true;
    }
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
            <Col md="8" sm="12" xs="12">
              <BreadCrum url={window.location.href} />
            </Col>
            <Col md="4" sm="12" xs="12">
              <PublicityBanner />
            </Col>
          </Row>
        </div>
        <div className="container-fluid">
          <Row>
            <Button type="primary" className="btn-lg btn-sidebarfilters-open d-block d-lg-none">FILTROS</Button>
            <Col md="3" sm="4" className="sidebar-filters d-none d-lg-block">
              <Button color="primary" className="btn-link-primary btn-sidebar-close d-none">
                <img src="/assets/images/icon-close.svg" alt="" />
              </Button>
              <FiltersList filters={this.state.filters} search={this.props.location.search} history={history} />
            </Col>
            <Col lg="9" md="12" sm="12" xs="12">
              <Row className="header-filters align-items-center">
                <Col md="8" sm="12" xs="12">
                  <NumberOfResult results={this.state.totalResults} />
                </Col>
                <div className="w-100 d-block d-sm-none mt-2 mb-2"></div>
                <Col md="4" sm="12" xs="12">
                  <Row className="align-items-center">
                    <div className="col-5 col-md-5 col-sm-3 col-xs-2 text-right">
                      <p>Ordenar por</p>
                    </div>
                    <div className="col-7 col-md-7 col-sm-9 col-xs-10">
                      <Dropdown isOpen={this.state.OrderDropdown} toggle={this.toggleOrderDropdown}>
                        <DropdownToggle caret color="default" className="btn-select">
                          {this.state.dropDownOrderValue}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Elije una</DropdownItem>
                          <DropdownItem value={1} onClick={e => this.changeOrderValue(e)}>Menor Precio</DropdownItem>
                          <DropdownItem value={2} onClick={e => this.changeOrderValue(e)}>Mayor precio</DropdownItem>
                          <DropdownItem value={3} onClick={e => this.changeOrderValue(e)}>Destacados Primero</DropdownItem>
                          <DropdownItem value={4} onClick={e => this.changeOrderValue(e)}>Apto para garantía Primero</DropdownItem>
                          <DropdownItem value={5} onClick={e => this.changeOrderValue(e)}>Publicación Reciente</DropdownItem>
                          <DropdownItem value={6} onClick={e => this.changeOrderValue(e)}>Mas nuevo</DropdownItem>
                          <DropdownItem value={7} onClick={e => this.changeOrderValue(e)}>Mas viejo</DropdownItem>
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
