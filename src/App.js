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
import Loadable from 'react-loadable';
import _404page from './stories/404page';
import LoginComponent from './stories/LoginComponent';


const Home = Loadable({loader: ()=>import('./Components/GeneralComponents/Home'), loading:()=><p>Cargando</p>})
const AgencyMicrosite = Loadable({loader: ()=>import('./Components/AccountComponents/AgencyMicrosite'), loading:()=><p>Cargando</p>})
const AgencyRegister = Loadable({loader: ()=>import('./Components/GeneralComponents/AgencyRegister'), loading:()=><p>Cargando</p>})
const AgencyRegisterStepOne = Loadable({loader: ()=>import('./Components/GeneralComponents/AgencyRegister/StepOne'), loading:()=><p>Cargando</p>})
const AgencyRegisterStepTwo = Loadable({loader: ()=>import('./Components/GeneralComponents/AgencyRegister/StepTwo'), loading:()=><p>Cargando</p>})
const AgencyRegisterStepThree = Loadable({loader: ()=>import('./Components/GeneralComponents/AgencyRegister/StepThree'), loading:()=><p>Cargando</p>})
const SearchCars = Loadable({loader: ()=>import('./Components/GeneralComponents/SearchCars'), loading:()=><p>Cargando</p>})
const RecoverPassword = Loadable({loader: ()=>import('./Components/GeneralComponents/RecoverPassword'), loading:()=><p>Cargando</p>})
const CarDetail = Loadable({loader: ()=>import('./Components/GeneralComponents/CarDetail'), loading:()=><p>Cargando</p>})
const CreatePublication = Loadable({loader: ()=>import('./Components/GeneralComponents/CreatePublication'), loading:()=><p>Cargando</p>})
const CreatePublicationStepOne = Loadable({loader: ()=>import('./Components/GeneralComponents/CreatePublication/StepOne'), loading:()=><p>Cargando</p>})
const CreatePublicationStepTwo = Loadable({loader: ()=>import('./Components/GeneralComponents/CreatePublication/StepTwo'), loading:()=><p>Cargando</p>})
const CreatePublicationStepThree = Loadable({loader: ()=>import('./Components/GeneralComponents/CreatePublication/StepThree'), loading:()=><p>Cargando</p>})
const FreeDestinationCredits = Loadable({loader: ()=>import('./Components/GeneralComponents/FreeDestinationCredits'), loading:()=><p>Cargando</p>})
const FriendlyAgency = Loadable({loader: ()=>import('./Components/GeneralComponents/FriendlyAgency'), loading:()=><p>Cargando</p>})
const Hire123Seguros = Loadable({loader: ()=>import('./Components/GeneralComponents/Hire123Seguros'), loading:()=><p>Cargando</p>})
const Inbox = Loadable({loader: ()=>import('./Components/AccountComponents/Inbox'), loading:()=><p>Cargando</p>})
const Microsite = Loadable({loader: ()=>import('./Components/GeneralComponents/Microsite'), loading:()=><p>Cargando</p>})
const PledgeCredits = Loadable({loader: ()=>import('./Components/GeneralComponents/PledgeCredits'), loading:()=><p>Cargando</p>})
const PersonalShopper = Loadable({loader: ()=>import('./Components/GeneralComponents/PersonalShopper'), loading:()=><p>Cargando</p>})
const PersonalShopperStepTwo = Loadable({loader: ()=>import('./Components/GeneralComponents/PersonalShopper/StepTwo'), loading:()=><p>Cargando</p>})
const PublicateWithoutRegister = Loadable({loader: ()=>import('./Components/GeneralComponents/PublicateWithoutRegister'), loading:()=><p>Cargando</p>})
const PublicateWithoutRegisterStepOne = Loadable({loader: ()=>import('./Components/GeneralComponents/PublicateWithoutRegister/StepOne'), loading:()=><p>Cargando</p>})
const PublicateWithoutRegisterStepTwo = Loadable({loader: ()=>import('./Components/GeneralComponents/PublicateWithoutRegister/StepTwo'), loading:()=><p>Cargando</p>})
const PublicateWithoutRegisterStepThree = Loadable({loader: ()=>import('./Components/GeneralComponents/PublicateWithoutRegister/StepThree'), loading:()=><p>Cargando</p>})
const PublicateWithoutRegisterStepFour = Loadable({loader: ()=>import('./Components/GeneralComponents/PublicateWithoutRegister/StepFour'), loading:()=><p>Cargando</p>})
const SuperAdminPublications = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminPublications'), loading:()=><p>Cargando</p>})
const SuperAdminInbox = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminInbox'), loading:()=><p>Cargando</p>})
const SuperAdminUsers = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminUsers'), loading:()=><p>Cargando</p>})
const SuperAdminRates = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminRates'), loading:()=><p>Cargando</p>})
const SuperAdminConsult = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminConsult'), loading:()=><p>Cargando</p>})
const SuperAdminAnalytics = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminAnalytics'), loading:()=><p>Cargando</p>})
const SuperAdminSliders = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminSliders'), loading:()=><p>Cargando</p>})
const SuperAdminMicrosite = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminMicrosite'), loading:()=><p>Cargando</p>})
const TermsAndConditions = Loadable({loader: ()=>import('./Components/GeneralComponents/TermsAndConditions'), loading:()=><p>Cargando</p>})
const UserAdmin = Loadable({loader: ()=>import('./Components/AccountComponents/UserAdmin'), loading:()=><p>Cargando</p>})
const UserConsult = Loadable({loader: ()=>import('./Components/AccountComponents/UserConsult'), loading:()=><p>Cargando</p>})
const UserProfile = Loadable({loader: ()=>import('./Components/AccountComponents/UserProfile'), loading:()=><p>Cargando</p>})
const UserInbox = Loadable({loader: ()=>import('./Components/AccountComponents/UserInbox'), loading:()=><p>Cargando</p>})
const UserPublications = Loadable({loader: ()=>import('./Components/AccountComponents/UserPublications'), loading:()=><p>Cargando</p>})
const UserRegister = Loadable({loader: ()=>import('./Components/GeneralComponents/UserRegister'), loading:()=><p>Cargando</p>})
const UserRegisterStepOne = Loadable({loader: ()=>import('./Components/GeneralComponents/UserRegister/StepOne'), loading:()=><p>Cargando</p>})
const UserRegisterStepTwo = Loadable({loader: ()=>import('./Components/GeneralComponents/UserRegister/StepTwo'), loading:()=><p>Cargando</p>})
const UserRegisterStepThree = Loadable({loader: ()=>import('./Components/GeneralComponents/UserRegister/StepThree'), loading:()=><p>Cargando</p>})
const WithoutRegister = Loadable({loader: ()=>import('./Components/GeneralComponents/WithoutRegister'), loading:()=><p>Cargando</p>})
const SuperAdminAllMessages = Loadable({loader: ()=>import('./Components/AdminComponents/SuperAdminAllMessages'), loading:()=><p>Cargando</p>})


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
            <Route exact path="/hire123Seguros" component={Hire123Seguros} />
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
            <Route exact path="/superAdminAnalytics" component={SuperAdminAnalytics} />
            <Route exact path="/SuperAdminMicrosite" component={SuperAdminMicrosite} />
            <Route exact path="/superAdminSliders" component={SuperAdminSliders} />
            <Route exact path="/superAdminConsult" component={SuperAdminConsult} />
            <Route exact path="/termsAndConditions" component={TermsAndConditions} />
            <Route exact path="/userAdmin" component={UserAdmin} />
            <Route exact path="/userConsult" component={UserConsult} />
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
