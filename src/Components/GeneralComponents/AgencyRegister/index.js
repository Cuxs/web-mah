/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import ReactGA from 'react-ga';
import RegisterBar from '../../../stories/RegisterBar';
import BannerRegister from '../../../stories/BannerRegister';
import FeaturesRegister from '../../../stories/FeaturesRegister';
import Faq from '../../../stories/Faq';
import Footer from '../../../stories/Footer';
import Plans from '../../../stories/Plans';

ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

const Home = ({ history }) => (
  <div>
    {ReactGA.pageview('/PLANES-AGENCIA')}
    <div>
      <RegisterBar history={history} />
      <BannerRegister history={history} />
      <div id="Features">
        <FeaturesRegister />
      </div>
      <div id="Plans">
        <Plans history={history} />
      </div>
      <div id="Faq">
        <Faq />
      </div>
      <Footer history={history} />
    </div>
  </div>
);

export default Home;
