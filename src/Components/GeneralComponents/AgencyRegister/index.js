/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import RegisterBar from '../../../stories/RegisterBar';
import BannerRegister from '../../../stories/BannerRegister';
import FeaturesRegister from '../../../stories/FeaturesRegister';
import Faq from '../../../stories/Faq';
import Footer from '../../../stories/Footer';
import Plans from '../../../stories/Plans';


const Home = ({ history }) => (
  <div>
    <div>
      <RegisterBar history={history} />
      <BannerRegister history={history} />
      <FeaturesRegister id="features" />
      <Plans history={history} />
      <Faq />
      <Footer history={history} />
    </div>
  </div>
);

export default Home;
