/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import { render } from 'react-snapshot';


import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});


render(<ApolloProvider client={client}>
  <App />
       </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
