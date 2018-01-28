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
    if (!loadingComments) {
      sortedThreads = (_.sortBy(Threads, th => th.messages.map(ms => (ms.read !== null))));
    }
    sortedThreads = _.orderBy(sortedThreads, ['createdAt'], ['desc']);
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col md="9" className="mt-4">
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

              <div className="cont-list-messages">
                <div className="list-message">
                  <div className="row">
                    <div className="col-2">
                      <img src="http://lorempixel.com/200/200/" alt="" width="100%" />
                    </div>
                    <div className="col-10">
                      <div className="row align-items-center">
                        <div className="col-9">
                          <small>22/02/17 |  10:33</small>
                          <p className="context-item">
                            <strong>Fiat Palio Weekend</strong>
                            1.8 Adventure Locker Pack Xtreme. 2014 - 42.018 km
                          </p>
                          <p>Hola, quisiera saber si recibe permuta?</p>
                        </div>
                        <div className="col-3 text-center">
                          <a href="" className="btn btn-link-primary">
                            <img src="/assets/images/icon-envelop-red.svg" alt="" />
                            Responder
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="list-message">
                  <div className="row">
                    <div className="col-2">
                      <img src="http://lorempixel.com/200/200/" alt="" width="100%" />
                    </div>
                    <div className="col-10">
                      <div className="row align-items-center">
                        <div className="col-9">
                          <small>22/02/17 |  10:33</small>
                          <p className="context-item">
                            <strong>Fiat Palio Weekend</strong>
                            1.8 Adventure Locker Pack Xtreme. 2014 - 42.018 km
                          </p>
                          <p>Hola, quisiera saber si recibe permuta?</p>
                        </div>
                        <div className="col-3 text-center">
                          <a href="" className="btn btn-link-primary">
                            <img src="/assets/images/icon-envelop2-red.svg" alt="" />
                            Ver
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

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
