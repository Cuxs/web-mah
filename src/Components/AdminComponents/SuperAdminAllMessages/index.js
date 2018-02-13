/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';

import AdminBar from '../../../stories/AdminBar';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';
import CardMessagge from '../../../stories/CardMessagge';
import NumberOfUnreads from '../../../stories/NumberOfUnreads';

import { AdminAllCommentThreads } from '../../../ApolloQueries/SuperAdminAllMessages';
import { getUserToken, isAdminLogged } from '../../../Modules/sessionFunctions';

class SuperAdminAllMessages extends Component {
  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
  }
  render() {
    const {
      history,
      location,
      commentThreadData: { AdminCommentThread: Threads, loading: loadingComments },
    } = this.props;
    let sortedThreads = [];
    /* sortedThreads = _.orderBy(Threads, ['updatedAt'], ['desc']); */

    sortedThreads = (_.sortBy(Threads, th => th.messages.map(ms => (ms.read !== null))));


    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <SuperAdminSideBar history={history} location={location} />
            </Col>
            <Col md="9" className="mt-4">
              {loadingComments ? (
                <img
                  className="loading-gif"
                  style={{ height: '400px' }}
                  src="/loading.gif"
                  key={0}
                  alt="Loading..."
                />
              ) : (
                <div className="cont-list-messages">
                  {!loadingComments && (
                  <NumberOfUnreads
                    totalMsg={Threads.length}
                    admin
                  />
                  )}
                  {sortedThreads.map(thr => <CardMessagge data={thr} admin />)}
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
  },
});

const withCommentThread = graphql(AdminAllCommentThreads, {
  name: 'commentThreadData',
  options,
});

const withData = compose(withCommentThread);

export default withData(SuperAdminAllMessages);
