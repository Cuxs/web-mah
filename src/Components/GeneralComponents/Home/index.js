/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';

import {
  HomeQuery,
  LastPublicationsQuery,
} from '../../../ApolloQueries/HomeQuery';
import CarHomeContainer from '../../../stories/CarHomeContainer';
import TopTopNav from '../../../stories/TopTopNav';
import SearchBar from '../../../stories/SearchBar';
import CarResult from '../../../stories/CarResult';
import Banner from '../../../stories/Banner';
import CreditsBanner from '../../../stories/CreditsBanner';
import LastPublications from '../../../stories/LastPublications';
import FriendlyCompanies from '../../../stories/FriendlyCompanies';
import Footer from '../../../stories/Footer';
import LoadingComponent from '../../../stories/LoadingComponent';

import photoGaleryParser from '../../../Modules/photoGaleryParser';

const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  );
const Home = ({
  data, history, location, lastPubs,
}) => (
  <div>
    {!data.loading && (
      <div>
        <TopTopNav history={history} />
        <SearchBar history={history} location={location} />
        <Banner />
        <CreditsBanner history={history} />
        <CarHomeContainer>
          {data.AllPublications.map(row => (
            <CarResult
              photoGalery={photoGaleryParser(row.ImageGroup)}
              data={row}
            />
          ))}
        </CarHomeContainer>
        <LastPublications>
          {!lastPubs.loading ?
            lastPubs.LastPublications.map(row => (
              <CarResult
                photoGalery={photoGaleryParser(row.ImageGroup)}
                data={row}
              />
            ))
            :
            []
          }
        </LastPublications>
        <FriendlyCompanies>
          <img src="http://placecage.com/c/250/130" alt="banner" />
          <img src="http://placecage.com/c/250/130" alt="banner" />
          <img src="http://placecage.com/c/250/130" alt="banner" />
          <img src="http://placecage.com/c/250/130" alt="banner" />
        </FriendlyCompanies>
        <Footer history={history} />
      </div>
    )}
  </div>
);
const options = {
  variables: {
    limit: 12,
    stateName: 'Activas',
  },
};
const withHomeQuery = graphql(HomeQuery, { options });
const withLastPublicationsQuery = graphql(LastPublicationsQuery, {
  name: 'lastPubs',
});
const withData = compose(
  withLastPublicationsQuery,
  withHomeQuery,
  renderWhileLoading(LoadingComponent, 'data'),
);

export default withData(Home);
