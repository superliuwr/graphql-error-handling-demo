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

const accessDenied = (context): boolean => {
  const forbiddenStatusCodes = [401, 403]

  return context.networkError && forbiddenStatusCodes.indexOf(context.networkError.statusCode) >= 0
}

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
})

const errorLink = onError((context) => {
  console.error('on error', context)
  console.error('on network error', JSON.stringify(context.networkError))
  console.error('on graphql error', JSON.stringify(context.graphQLErrors))

  if (accessDenied(context)) {
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
  console.log('SetContext', operation)
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
