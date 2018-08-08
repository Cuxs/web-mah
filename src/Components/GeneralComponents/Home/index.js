/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Fragment } from 'react';
import { graphql, compose } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import { hotjar } from "react-hotjar";
import {mobilecheck} from "../../../Modules/functions";

import {
  HomeQuery,
  LastPublicationsQuery,
} from '../../../ApolloQueries/HomeQuery';
import {
  GetTextsQuery,
} from '../../../ApolloQueries/TextsQueries';
import CarHomeContainer from '../../../stories/CarHomeContainer';
import TopTopNav from '../../../stories/TopTopNav';
import SearchBar from '../../../stories/SearchBar';
import CarResult from '../../../stories/CarResult';
import Banner from '../../../stories/Banner';
import Card123Seguros from '../../../stories/Card123Seguros';
import CreditsBanner from '../../../stories/CreditsBanner';
import LastPublications from '../../../stories/LastPublications';
import FriendlyCompanies from '../../../stories/FriendlyCompanies';
import Footer from '../../../stories/Footer';
import LoadingComponent from '../../../stories/LoadingComponent';

import photoGaleryParser from '../../../Modules/photoGaleryParser';

const script = document.createElement('script');
script.src = '//code.tidio.co/2adtbpujxsburoaa4sm7umttnp1j1wjr.js';
script.async = true;
!mobilecheck() && document.body.appendChild(script);


const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  );
const Home = ({
  data, history, location, lastPubs, Texts,
}) => (
  <div>
    {!data.loading && (
      <div>
        {ReactGA.pageview('/HOME')}
        {hotjar.initialize(916734, 6)}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Bienvenido a Mi Auto Hoy</title>
        </Helmet>
        <TopTopNav history={history} />
        <SearchBar history={history} location={location} />
        {!Texts.loading && <Fragment>
          <Banner Texts={Texts} />
          <CreditsBanner history={history} Texts={Texts} />
        </Fragment>}
        <CarHomeContainer>
          {data.HighlightedPublications.map(row => (
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
        <Card123Seguros />
        <FriendlyCompanies>
          <a href="http://www.mendoza.gov.ar/prevencionvial/"><img src="/assets/images/EA1.jpg" alt="prevencion" /></a>
          <a href="http://www.pueblobenegas.com/"><img src="/assets/images/EA2.jpg" alt="benegas" /></a>
          <a href="http://miautohoy.com/microsite?concesionaria=LM%20Automotores&c_id=26"><img src="/assets/images/EA3.jpg" alt="lm-automotores" /></a>
          <a href="http://www.mktinversiones.com.ar/"><img src="/assets/images/EA4.jpg" alt="mkt" /></a>
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
const withTextsQuery = graphql(GetTextsQuery, { options: { variables: { route: 'home' } }, name: 'Texts' });
const withHomeQuery = graphql(HomeQuery, { options });
const withLastPublicationsQuery = graphql(LastPublicationsQuery, {
  name: 'lastPubs',
});
const withData = compose(
  withLastPublicationsQuery,
  withHomeQuery,
  renderWhileLoading(LoadingComponent, 'data'),
  withTextsQuery,
);

export default withData(Home);
