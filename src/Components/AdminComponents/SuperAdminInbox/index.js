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

import style from '../../../Styles/pledgeCredits';
import {
  CommentThreadQuery,
  CountUnreadMessagesQuery,
  CommentThreadSubscription,
} from '../../../ApolloQueries/UserInboxQuery';
import { getUserToken } from '../../../Modules/sessionFunctions';

class UserInbox extends Component {
  componentWillMount() {
    this.props.subscribeToNewThreads({
      MAHtoken: getUserToken(),
    });
  }
  render() {
    const {
      history,
      location,
      unreadMessagesData: { loading, CountUnreadMessages },
      commentThreadData: { CommentThread: Threads, loading: loadingComments },
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
                  {!loading && (
                  <NumberOfUnreads
                    results={CountUnreadMessages[0]}
                    totalMsg={Threads.length}
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
    MAHtokenP2: getUserToken(),
  },
});

const withUnreadMessagesQuantity = graphql(CountUnreadMessagesQuery, {
  name: 'unreadMessagesData',
  options,
});
const withCommentThread = graphql(CommentThreadQuery, {
  name: 'commentThreadData',
  options,
});
const withThreadSubscription = graphql(CommentThreadQuery, {
  name: 'threadSubscriptions',
  options,
  props: props => ({
    subscribeToNewThreads: params =>
      props.threadSubscriptions.subscribeToMore({
        document: CommentThreadSubscription,
        variables: {
          MAHtoken: params.MAHtoken,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newFeedItem = subscriptionData.data.threadAdded;
          return Object.assign({}, prev, {
            CommentThread: [...prev.CommentThread, newFeedItem],
          });
        },
      }),
  }),
});

const withData = compose(withUnreadMessagesQuantity, withCommentThread, withThreadSubscription);

export default withData(UserInbox);
