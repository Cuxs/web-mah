/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import Home from './Components/Home';
import AgencyAdmin from './Components/AgencyAdmin';
import AgencyPublications from './Components/AgencyPublications';
import AgencyInbox from './Components/AgencyInbox';
import AgencyMessage from './Components/AgencyMessage';
import AgencyProfile from './Components/AgencyProfile';
import AgencyMicrosite from './Components/AgencyMicrosite';
import AgencyRegister from './Components/AgencyRegister';
import AgencyRegisterStepOne from './Components/AgencyRegister/StepOne';
import AgencyRegisterStepTwo from './Components/AgencyRegister/StepTwo';
import AgencyRegisterStepThree from './Components/AgencyRegister/StepThree';
import SearchCars from './Components/SearchCars';
import CarDetail from './Components/CarDetail';
import CreatePublication from './Components/CreatePublication';
import CreatePublicationStepOne from './Components/CreatePublication/StepOne';
import CreatePublicationStepTwo from './Components/CreatePublication/StepTwo';
import CreatePublicationStepThree from './Components/CreatePublication/StepThree';
import FreeDestinationCredits from './Components/FreeDestinationCredits';
import Microsite from './Components/Microsite';
import PledgeCredits from './Components/PledgeCredits';
import PersonalShopper from './Components/PersonalShopper';
import PersonalShopperStepTwo from './Components/PersonalShopper/StepTwo';
import PublicateWithoutRegister from './Components/PublicateWithoutRegister';
import PublicateWithoutRegisterStepOne from './Components/PublicateWithoutRegister/StepOne';
import PublicateWithoutRegisterStepTwo from './Components/PublicateWithoutRegister/StepTwo';
import PublicateWithoutRegisterStepThree from './Components/PublicateWithoutRegister/StepThree';
import PublicateWithoutRegisterStepFour from './Components/PublicateWithoutRegister/StepFour';
import UserAdmin from './Components/UserAdmin';
import UserProfile from './Components/UserProfile';
import UserInbox from './Components/UserInbox';
import UserRegister from './Components/UserRegister';
import UserRegisterStepOne from './Components/UserRegister/StepOne';
import UserRegisterStepTwo from './Components/UserRegister/StepTwo';
import UserRegisterStepThree from './Components/UserRegister/StepThree';
import WithoutRegister from './Components/WithoutRegister';

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

const App = () => (
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
        <Route exact path="/agencyAdmin" component={AgencyAdmin} />
        <Route exact path="/agencyPublications" component={AgencyPublications} />
        <Route exact path="/agencyInbox" component={AgencyInbox} />
        <Route exact path="/agencyMessage" component={AgencyMessage} />
        <Route exact path="/agencyProfile" component={AgencyProfile} />
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
        <Route exact path="/microsite" component={Microsite} />
        <Route exact path="/pledgeCredits" component={PledgeCredits} />
        <Route exact path="/personalShopperS1" component={PersonalShopper} />
        <Route exact path="/personalShopperS2" component={PersonalShopperStepTwo} />
        <Route exact path="/publicateWithoutRegister" component={PublicateWithoutRegister} />
        <Route exact path="/publicateWithoutRegisterS1" component={PublicateWithoutRegisterStepOne} />
        <Route exact path="/publicateWithoutRegisterS2" component={PublicateWithoutRegisterStepTwo} />
        <Route exact path="/publicateWithoutRegisterS3" component={PublicateWithoutRegisterStepThree} />
        <Route exact path="/publicateWithoutRegisterS4" component={PublicateWithoutRegisterStepFour} />
        <Route exact path="/userAdmin" component={UserAdmin} />
        <Route exact path="/userProfile" component={UserProfile} />
        <Route exact path="/userInbox" component={UserInbox} />
        <Route exact path="/userRegister" component={UserRegister} />
        <Route exact path="/userRegisterS1" component={UserRegisterStepOne} />
        <Route exact path="/userRegisterS2" component={UserRegisterStepTwo} />
        <Route exact path="/userRegisterS3" component={UserRegisterStepThree} />
        <Route exact path="/withoutRegister" component={WithoutRegister} />
      </Switch>
    </div>
  </Router>
);
export default App;
