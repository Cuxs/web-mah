/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import HomeQuery from '../../ApolloQueries/HomeQuery';
import CarHomeContainer from '../../stories/CarHomeContainer';
import TopTopNav from '../../stories/TopTopNav';
import SearchBar from '../../stories/SearchBar';
import CarResult from '../../stories/CarResult';
import Banner from '../../stories/Banner';
import CreditsBanner from '../../stories/CreditsBanner';
import Footer from '../../stories/Footer';

import photoGaleryParser from '../../Modules/photoGaleryParser';

const Home = ({ data }) => (
  <div>
    {!data.loading &&
      <div>
        <TopTopNav />
        <SearchBar />
        <Banner />
        <CreditsBanner />
        <CarHomeContainer>
          {data.AllPublications.map(row => (
            <CarResult photoGalery={photoGaleryParser(row.ImageGroup)} data={row} {...{ [row.State]: true }} />))
          }
        </CarHomeContainer>
        <Footer />
      </div>
      }
  </div>
);

export default HomeQuery(Home);
