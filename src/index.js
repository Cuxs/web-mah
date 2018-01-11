/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import { render } from 'react-snapshot';


import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { toIdValue } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const cache = new InMemoryCache({
  cacheResolvers: {
    Query: {
      Publication: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'AllPublications', id }) || cache.config.dataIdFromObject({ __typename: 'SearchPublication', id })),
    },
  },
});

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache,
});


render(<ApolloProvider client={client}>
  <App />
</ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
