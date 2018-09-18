import React from 'react';
import { Row, Button } from 'reactstrap';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';

import InputOrText from './InputOrText';
import {scroller} from 'react-scroll';
import _ from 'lodash';

import { validate } from "../Modules/functions";
/* eslint react/jsx-filename-extension: 0 */

class BannerUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValidate: true,
      text: 'Publicá gratis, crea tu cuenta y comenzá a ganar dinero vendiendo autos!',
    };
  }


  renderButton(service) {
    return (
      <button className="service" style={{ background: 'url(/assets/images/services-01.png) no-repeat center center' }}>

      </button>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderButton()}
      </div>
    )
  }
}

export default BannerUser;
