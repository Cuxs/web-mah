/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
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
} from '../../ApolloQueries/UserInboxQuery';
import { getUserToken } from '../../Modules/sessionFunctions';

const UserInbox = ({
  history,
  location,
  unreadMessagesData: { loading, CountUnreadMessages },
  commentThreadData: { CommentThread: Threads, loading: loadingComments },
}) => {
  let sortedThreads = [];
  if (!loadingComments) {
    sortedThreads = (_.sortBy(Threads, th => th.messages.map(ms => (ms.read !== null))));
  }
  return (
    <div>
      <AdminBar history={history} />
      <Row>
        <Col md="3">
          <UserSideBar history={history} location={location} />
        </Col>
        <Col md="9">
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
      <style jsx>{style}</style>
    </div>
  );
};

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
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

const withData = compose(withUnreadMessagesQuantity, withCommentThread);

export default withData(UserInbox);
