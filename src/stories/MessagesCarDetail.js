import React, { Component } from 'react';
import { FormGroup, Input, Label, Button } from 'reactstrap';
import { ChatFeed, Message } from 'react-chat-ui';
import { graphql, compose } from 'react-apollo';
import jwtDecode from 'jwt-decode';
import { parse } from 'query-string';
import { getUserDataFromToken, isUserLogged } from '../Modules/sessionFunctions';

import {
  MessageQuery,
  MessageSubscription,
  addMessageMutation,
  createCommentThread,
} from '../ApolloQueries/MessagesCarDetailQuery';

/* eslint react/jsx-filename-extension: 0 */
/* eslint camelcase: 0 */
/* eslint react/prop-types: 0 */

const fillStateWithMessages = (messagesData, location, publicationUserId) => {
  // En caso de ser un mensaje de un usuario anónimo
  const anonymName = parse(location.search).chatToken
    ? jwtDecode(parse(location.search).chatToken).name
    : null;
  if (!messagesData.loading) {
    const messages = [];
    messagesData.Messages.map((message) => {
      messages.push(new Message({
        id: publicationUserId !== message.from_id ? 0 : message.from_id,
        message: message.content,
        senderName: message.User ? message.User.name : anonymName,
      }));
    });
    return messages;
  }
  return [
    new Message({
      id: 0,
      message: 'Cargando mensajes...',
    }),
  ];
};

class MessagesCarDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  componentWillMount() {
    this.props.subscribeToNewMessages({
      commentThread_id: this.props.commentThread_id,
    });
  }
  isTextInputIncomplete() {
    if (this.state.content === '') {
      return true;
    }
    return false;
  }
  sendMessage() {
    const { content } = this.state;
    if (!isUserLogged()) {
      console.log('No estas logueado');
      return false;
    }
    if (this.props.commentThread_id) {
      this.props.mutate({
        variables: {
          commentThread_id: this.props.commentThread_id,
          from_id: getUserDataFromToken().id,
          content,
        },
      });
      this.setState({ content: '' });
      return true;
    }
    
    this.props.createCommentThread({
      variables: {
        publication_id: this.props.publicationId,
        content: this.state.content,
        participant1_id: getUserDataFromToken().id,
      },
    });
  }
  render() {
    const { messagesData, location, publicationUserId } = this.props;
    return (
      <span>
        <FormGroup>
          <Label for="exampleText">Contactar al Vendedor</Label>
          <ChatFeed
            maxHeight={400}
            messages={fillStateWithMessages(
              messagesData,
              location,
              publicationUserId,
            )} // Boolean: list of message objects
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName // show the name of the user who sent the message
            bubblesCentered // Boolean should the bubbles be centered in the feed?
            bubbleStyles={{
              text: {
                fontSize: 30,
              },
              chatbubble: {
                borderRadius: 70,
                padding: 40,
              },
            }}
          />
          <Input
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            type="textarea"
            name="text"
            id="exampleText"
            placeholder="Escribe una consulta"
          />
        </FormGroup>
        <Button
          disabled={this.isTextInputIncomplete()}
          onClick={() => this.sendMessage()}
          color="secondary"
        >
          Preguntar
        </Button>
      </span>
    );
  }
}
const options = ({ commentThread_id }) => ({
  variables: {
    commentThread_id,
  },
});
const withMessages = graphql(MessageQuery, {
  name: 'messagesData',
  options,
});
const withMessagesSubscription = graphql(MessageQuery, {
  name: 'messagesSubscriptions',
  options,
  props: props => ({
    subscribeToNewMessages: params =>
      props.messagesSubscriptions.subscribeToMore({
        document: MessageSubscription,
        variables: {
          commentThread_id: params.commentThread_id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newFeedItem = subscriptionData.data.messageAdded;
          return Object.assign({}, prev, {
            Messages: [...prev.Messages, newFeedItem],
          });
        },
      }),
  }),
});
const withMessageMutation = graphql(addMessageMutation);
const withCommentThreadMutation = graphql(createCommentThread, {
  name: 'createCommentThread',
});
const withData = compose(
  withMessages,
  withMessagesSubscription,
  withMessageMutation,
  withCommentThreadMutation,
);
const MessagesCarWithData = withData(MessagesCarDetail);

export default MessagesCarWithData;
