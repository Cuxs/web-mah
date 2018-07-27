/* eslint react/jsx-filename-extension: 0 */
import React, { Component } from 'react';
import ReactGA from 'react-ga';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './Components/GeneralComponents/Home';
import AgencyMicrosite from './Components/AccountComponents/AgencyMicrosite';
import AgencyRegister from './Components/GeneralComponents/AgencyRegister';
import AgencyRegisterStepOne from './Components/GeneralComponents/AgencyRegister/StepOne';
import AgencyRegisterStepTwo from './Components/GeneralComponents/AgencyRegister/StepTwo';
import AgencyRegisterStepThree from './Components/GeneralComponents/AgencyRegister/StepThree';
import SearchCars from './Components/GeneralComponents/SearchCars';
import RecoverPassword from './Components/GeneralComponents/RecoverPassword';
import CarDetail from './Components/GeneralComponents/CarDetail';
import CreatePublication from './Components/GeneralComponents/CreatePublication';
import CreatePublicationStepOne from './Components/GeneralComponents/CreatePublication/StepOne';
import CreatePublicationStepTwo from './Components/GeneralComponents/CreatePublication/StepTwo';
import CreatePublicationStepThree from './Components/GeneralComponents/CreatePublication/StepThree';
import FreeDestinationCredits from './Components/GeneralComponents/FreeDestinationCredits';
import FriendlyAgency from './Components/GeneralComponents/FriendlyAgency';
import Inbox from './Components/AccountComponents/Inbox';
import Microsite from './Components/GeneralComponents/Microsite';
import PledgeCredits from './Components/GeneralComponents/PledgeCredits';
import PersonalShopper from './Components/GeneralComponents/PersonalShopper';
import PersonalShopperStepTwo from './Components/GeneralComponents/PersonalShopper/StepTwo';
import PublicateWithoutRegister from './Components/GeneralComponents/PublicateWithoutRegister';
import PublicateWithoutRegisterStepOne from './Components/GeneralComponents/PublicateWithoutRegister/StepOne';
import PublicateWithoutRegisterStepTwo from './Components/GeneralComponents/PublicateWithoutRegister/StepTwo';
import PublicateWithoutRegisterStepThree from './Components/GeneralComponents/PublicateWithoutRegister/StepThree';
import PublicateWithoutRegisterStepFour from './Components/GeneralComponents/PublicateWithoutRegister/StepFour';
import SuperAdminPublications from './Components/AdminComponents/SuperAdminPublications';
import SuperAdminInbox from './Components/AdminComponents/SuperAdminInbox';
import SuperAdminUsers from './Components/AdminComponents/SuperAdminUsers';
import SuperAdminRates from './Components/AdminComponents/SuperAdminRates';
import SuperAdminSliders from './Components/AdminComponents/SuperAdminSliders';
import SuperAdminMicrosite from './Components/AdminComponents/SuperAdminMicrosite';
import TermsAndConditions from './Components/GeneralComponents/TermsAndConditions';
import UserAdmin from './Components/AccountComponents/UserAdmin';
import UserProfile from './Components/AccountComponents/UserProfile';
import UserInbox from './Components/AccountComponents/UserInbox';
import UserPublications from './Components/AccountComponents/UserPublications';
import UserRegister from './Components/GeneralComponents/UserRegister';
import UserRegisterStepOne from './Components/GeneralComponents/UserRegister/StepOne';
import UserRegisterStepTwo from './Components/GeneralComponents/UserRegister/StepTwo';
import UserRegisterStepThree from './Components/GeneralComponents/UserRegister/StepThree';
import WithoutRegister from './Components/GeneralComponents/WithoutRegister';
import SuperAdminAllMessages from './Components/AdminComponents/SuperAdminAllMessages';

import _404page from './stories/404page';
import LoginComponent from './stories/LoginComponent';


const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => (
        <h3>Please select a topic.</h3>
    )}
    />
  </div>
);

class App extends Component {
  componentDidMount(){
    ReactGA.initialize(process.env.REACT_APP_ANALYTICS);
  }
  render() {
    
    return (
      <Router>
        <div>
          {/*     <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/searchCars" component={SearchCars} />
            <Route exact path="/agencyMicrosite" component={AgencyMicrosite} />
            <Route exact path="/agencyRegister" component={AgencyRegister} />
            <Route exact path="/agencyRegisterS1" component={AgencyRegisterStepOne} />
            <Route exact path="/agencyRegisterS2" component={AgencyRegisterStepTwo} />
            <Route exact path="/agencyRegisterS3" component={AgencyRegisterStepThree} />
            <Route exact path="/carDetail" component={CarDetail} />
            <Route exact path="/createPublication" component={CreatePublication} />
            <Route exact path="/createPublicationS1" component={CreatePublicationStepOne} />
            <Route exact path="/createPublicationS2" component={CreatePublicationStepTwo} />
            <Route exact path="/createPublicationS3" component={CreatePublicationStepThree} />
            <Route exact path="/freeDestinationCredits" component={FreeDestinationCredits} />
            <Route exact path="/friendlyAgency" component={FriendlyAgency} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/microsite" component={Microsite} />
            <Route exact path="/pledgeCredits" component={PledgeCredits} />
            <Route exact path="/personalShopperS1" component={PersonalShopper} />
            <Route exact path="/personalShopperS2" component={PersonalShopperStepTwo} />
            <Route exact path="/publicateWithoutRegister" component={PublicateWithoutRegister} />
            <Route exact path="/publicateWithoutRegisterS1" component={PublicateWithoutRegisterStepOne} />
            <Route exact path="/publicateWithoutRegisterS2" component={PublicateWithoutRegisterStepTwo} />
            <Route exact path="/publicateWithoutRegisterS3" component={PublicateWithoutRegisterStepThree} />
            <Route exact path="/publicateWithoutRegisterS4" component={PublicateWithoutRegisterStepFour} />
            <Route exact path="/superAdminPublications" component={SuperAdminPublications} />
            <Route exact path="/superAdminInbox" component={SuperAdminInbox} />
            <Route exact path="/superAdminAllMessages" component={SuperAdminAllMessages} />
            <Route exact path="/superAdminUsers" component={SuperAdminUsers} />
            <Route exact path="/superAdminRates" component={SuperAdminRates} />
            <Route exact path="/SuperAdminMicrosite" component={SuperAdminMicrosite} />
            <Route exact path="/superAdminSliders" component={SuperAdminSliders} />
            <Route exact path="/termsAndConditions" component={TermsAndConditions} />
            <Route exact path="/userAdmin" component={UserAdmin} />
            <Route exact path="/userPublications" component={UserPublications} />
            <Route exact path="/userProfile" component={UserProfile} />
            <Route exact path="/userInbox" component={UserInbox} />
            <Route exact path="/userRegister" component={UserRegister} />
            <Route exact path="/userRegisterS1" component={UserRegisterStepOne} />
            <Route exact path="/userRegisterS2" component={UserRegisterStepTwo} />
            <Route exact path="/userRegisterS3" component={UserRegisterStepThree} />
            <Route exact path="/withoutRegister" component={WithoutRegister} />
            <Route exact path="/RecoverPassword" component={RecoverPassword} />
            <Redirect from="/admin" to="/superAdminPublications" />
            <Redirect from="/loginAdmin" to={{ pathname: '/login', state: 'isAdmin' }} />
            <Route exact path="/login" component={LoginComponent} />
            <Route component={_404page} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
