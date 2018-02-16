/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import RegisterBar from '../../../stories/RegisterBar';
import BannerUser from '../../../stories/BannerUser';
import FeaturesUser from '../../../stories/FeaturesUser';
import Faq from '../../../stories/Faq';
import Footer from '../../../stories/Footer';
import Plans from '../../../stories/Plans';


const Home = ({ history }) => (
  <div>
    <RegisterBar />
    <BannerUser history={history} />
    <FeaturesUser />
    <Plans />
    <Faq />
    <Footer history={history} />
  </div>
);

export default Home;
