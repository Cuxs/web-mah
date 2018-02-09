/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import _ from 'lodash';
import { graphql } from 'react-apollo';

import HomeQuery from '../../../ApolloQueries/HomeQuery';
import CarHomeContainer from '../../../stories/CarHomeContainer';
import TopTopNav from '../../../stories/TopTopNav';
import SearchBar from '../../../stories/SearchBar';
import CarResult from '../../../stories/CarResult';
import Banner from '../../../stories/Banner';
import CreditsBanner from '../../../stories/CreditsBanner';
import LastPublications from '../../../stories/LastPublications';
import FriendlyCompanies from '../../../stories/FriendlyCompanies';
import Footer from '../../../stories/Footer';

import photoGaleryParser from '../../../Modules/photoGaleryParser';

const Home = ({ data, history, location }) => (
  <div>
    {!data.loading &&
      <div>
        <TopTopNav history={history} />
        <SearchBar history={history} location={location} />
        <Banner />
        <CreditsBanner />
        <CarHomeContainer>
          {data.AllPublications.map(row => (
            <CarResult photoGalery={photoGaleryParser(row.ImageGroup)} data={row} />))
          }
        </CarHomeContainer>

        <LastPublications>
          {_.slice(data.AllPublications, 0, 4).map(row => (
            <CarResult photoGalery={photoGaleryParser(row.ImageGroup)} data={row} />))
          }
        </LastPublications>
        <FriendlyCompanies>
          <img src="http://placecage.com/c/250/130" alt="banner" />
          <img src="http://placecage.com/c/250/130" alt="banner" />
          <img src="http://placecage.com/c/250/130" alt="banner" />
          <img src="http://placecage.com/c/250/130" alt="banner" />
        </FriendlyCompanies>
        <Footer />
      </div>
      }
  </div>
);
const options = {
  variables: {
    limit: 12,
    stateName: 'Activas',
  },
};
export default graphql(HomeQuery, { options })(Home);
