/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row } from 'reactstrap';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import AdminBar from '../../../stories/AdminBar';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';

;(function(w, d, s, g, js, fjs) {
  g = w.gapi || (w.gapi = {})
  g.analytics = {
    q: [],
    ready: function(cb) {
      this.q.push(cb)
    }
  }
  gapi.analytics.auth.authorize({
    'serverAuth': {
      'access_token': 'ya29.c.Elm_BXza3K-NuKZID6ndLYf8PBonFPtTPDIXYh0T9L1h4b5cYCxJaK_aKDszc9ujA6P4MpFV9S6VkiVXDU_wgU9fy2NPLebflK8Yys4Aobnm9EmqD0hM3m5mcw'
    }
  }); 
  js = d.createElement(s)
  fjs = d.getElementsByTagName(s)[0]
  js.src = "https://apis.google.com/js/platform.js"
  fjs.parentNode.insertBefore(js, fjs)
  js.onload = function() {
    g.load("analytics")
  }
})(window, document, "script")

const last30days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "30daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "LINE",
    options: {
      // options for google charts
      // https://google-developers.appspot.com/chart/interactive/docs/gallery
      title: "Last 30 days pageviews"
    }
  }
}

// graph 2 config
const last7days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "7daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "LINE"
  }
}

// analytics views ID
const views = {
  query: {
    ids: "ga:87986986"
  }
}

export default ({ location, history }) => (
  <div>
    <AdminBar history={history} />
    <div className="container-fluid">
      <Row>
        <Col lg="3" md="12" >
          <SuperAdminSideBar history={history} location={location} />
        </Col>
        <Col lg="9" md="12" >
        <GoogleProvider clientId='AIzaSyChnfR-Jbp2DOd12Pn_LP6Ji7e6y2Yi4_A'>
          <GoogleDataChart views={views} config={last30days} />
          <GoogleDataChart views={views} config={last7days} />
        </GoogleProvider>
        </Col>
      </Row>
    </div>
  </div>
);
