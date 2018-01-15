/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import RegisterBar from '../../stories/RegisterBar';
import BannerRegister from '../../stories/BannerRegister';
import FeaturesRegister from '../../stories/FeaturesRegister';
import Faq from '../../stories/Faq';
import Footer from '../../stories/Footer';
import Plans from '../../stories/Plans';


const Home = () => (
  <div>
    <div>
      <RegisterBar />
      <BannerRegister />
      <FeaturesRegister />
      <Plans />
      <Faq />
      <Footer />
    </div>
  </div>
);

export default Home;
