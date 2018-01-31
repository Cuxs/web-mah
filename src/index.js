/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import { render } from 'react-snapshot';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition, toIdValue } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
// import 'bootstrap';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://192.168.99.157/:4000/graphql',
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
    noServer: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  link,
  cache,
});


render(<ApolloProvider client={client}>
  <App />
       </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
