/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';

import AdminBar from '../../stories/AdminBar';
import UserSideBar from '../../stories/UserSideBar';
import CardMessagge from '../../stories/CardMessagge';
import NumberOfUnreads from '../../stories/NumberOfUnreads';

import style from '../../Styles/pledgeCredits';
import {
  CommentThreadQuery,
  CountUnreadMessagesQuery,
  CommentThreadSubscription,
} from '../../ApolloQueries/UserInboxQuery';
import { getUserToken } from '../../Modules/sessionFunctions';

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
    /* (_.sortBy(Threads, th => th.messages.map(ms => (ms.read !== null)))); */
    const partition = _.partition(Threads, th => th.messages.map(ms => (ms.read === null))[0]);
    sortedThreads = _.concat(partition[0], partition[1]);
    sortedThreads = _.orderBy(sortedThreads, ['id'], ['desc']);
    return (
      <div>
        <AdminBar history={history} />
        <div className="container">
          <Row>
            <Col md="3" className="d-none d-md-block">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col md="9" sm="12" xs="12" className="mt-4">
              {loadingComments ? (
                <img
                  style={{ height: '400px' }}
                  src="/loading.gif"
                  key={0}
                  alt="Loading..."
                />
              ) : (
                <span>
                  {!loading && (
                    <NumberOfUnreads
                      results={CountUnreadMessages[0]}
                      totalMsg={Threads.length}
                    />
                  )}
                  {sortedThreads.map(thr => <CardMessagge data={thr} />)}
                </span>
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
