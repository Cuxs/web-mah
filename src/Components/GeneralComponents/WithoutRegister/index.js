/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import RegisterBar from '../../../stories/RegisterBar';
import BannerWithoutRegister from '../../../stories/BannerWithoutRegister';
import FeaturesWithoutRegister from '../../../stories/FeaturesWithoutRegister';
import Faq from '../../../stories/Faq';
import Footer from '../../../stories/Footer';
import Plans from '../../../stories/Plans';
import { isUserLogged } from '../../../Modules/sessionFunctions';

const WithoutRegister = ({ history, location }) => (
  <div>
    {isUserLogged() &&
    <Redirect to="/createPublication" />}
    <RegisterBar history={history} location={location} />
    <BannerWithoutRegister />
    <FeaturesWithoutRegister />
    <Plans />
    <Faq />
    <Footer />
  </div>
);

export default WithoutRegister;
