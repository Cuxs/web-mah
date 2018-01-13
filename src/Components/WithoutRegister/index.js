/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import RegisterBar from '../../stories/RegisterBar';
import BannerWithoutRegister from '../../stories/BannerWithoutRegister';
import FeaturesWithoutRegister from '../../stories/FeaturesWithoutRegister';
import Faq from '../../stories/Faq';
import Footer from '../../stories/Footer';
import Plans from '../../stories/Plans';


const WithoutRegister = () => (
  <div>
    <RegisterBar />
    <BannerWithoutRegister />
    <FeaturesWithoutRegister />
    <Plans />
    <Faq />
    <Footer />
  </div>
);

export default WithoutRegister;
