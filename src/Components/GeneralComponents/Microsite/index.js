
/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import qs from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import InfiniteScroll from 'react-infinite-scroller';

import SearchMutation from '../../../ApolloQueries/SearchMutation';
import { GetAgencyDetail } from '../../../ApolloQueries/FriendlyAgencyQueries';

import CarResultContainer from '../../../stories/CarResultContainer';
import CarResult from '../../../stories/CarResult';
import SearchBar from '../../../stories/SearchBar';
import TopTopNav from '../../../stories/TopTopNav';
import NumberOfResult from '../../../stories/NumberOfResult';
import HeaderAgency from '../../../stories/HeaderAgency';

import photoGaleryParser from '../../../Modules/photoGaleryParser';

class Microsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { searchPublication: '' },
      totalCount: 0,
    };
  }
  componentWillMount() {
    const url = this.props.location.search;
    this.doSearch(url);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.doSearch(nextProps.location.search);
    }
    scroll.scrollToTop({ duration: 300 });
  }
  doSearch(url) {
    this.props
      .mutate({
        variables: {
          user_id: qs.parse(url).c_id,
        },
      })
      .then(({ data }) => {
        this.setState({
          data,
          totalCount: data.searchPublication.totalCount,
        });
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }
  renderData() {
    if (this.state.totalCount === 0) {
      return <p>Esta agencia no posee publiciones activas. </p>;
    }
    if (this.state.data.searchPublication === '') {
      return <p>Cargando...</p>;
    }
    return (
      <div>
        <div className="offset-md-3">
          <br />
          <NumberOfResult results={this.state.totalCount} concesionaria />
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
      </div>
    );
  }

  render() {
    const { text } = qs.parse(this.props.location.search);
    const {
      history, location, AgencyData,
    } = this.props;
    return (
      <div>
        <TopTopNav history={history} />
        <SearchBar
          text={text}
          history={history}
          location={location}
        />
        {AgencyData.loading ?
          <img
            className="loading-gif"
            style={{ height: '250px' }}
            src="/loading.gif"
            key={0}
            alt="Loading..."
          /> :
          <HeaderAgency data={AgencyData.GetAgencyDetail} />
        }
        <InfiniteScroll
          pageStart={0}
          loadMore={this.doSearch}
          hasMore={this.state.renderedData < this.state.totalCount}
          loader={<img className="loading-gif" src="/loading.gif" key={0} alt="Loading..." />}
        >
          {this.renderData()}
        </InfiniteScroll>
      </div>
    );
  }
}
const options = ({ location }) => ({
  variables: {
    id: qs.parse(location.search).c_id,
  },
});
const withSearchMutation = graphql(SearchMutation);
const withAgencyDetail = graphql(GetAgencyDetail, {
  name: 'AgencyData',
  options,
});

const withData = compose(withAgencyDetail, withSearchMutation);

export default withData(Microsite);
