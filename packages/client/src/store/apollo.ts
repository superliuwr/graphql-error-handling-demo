import config from '../config'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

// Install the vue plugin
Vue.use(VueApollo)

const accessDenied = (networkError): boolean => {
  const forbiddenStatusCodes = [401, 403]

  return networkError && forbiddenStatusCodes.indexOf(networkError.statusCode) >= 0
}

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }

  if (accessDenied(networkError)) {
    // The user's token is invalid or unavailable
    // store.dispatch('user/login')
  } else {
    // Log a message to the user
    // ...
  }
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'token': 'sesame',
    }
  });
  return forward(operation)
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: from([
    authMiddleware,
    errorLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})
