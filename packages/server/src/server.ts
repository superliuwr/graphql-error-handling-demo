import * as cors from 'cors'
import * as express from 'express'
import * as expressLogger from 'express-bunyan-logger'
import { ApolloServer } from 'apollo-server-express'
import { isAuthenticated } from './auth'
import { resolvers, typeDefs } from './graphql'

const setupApp = async (): Promise<express.Express> => {
  const app: express.Express = require('express')()

  app.use(
    expressLogger({
      name: 'server',
      format: ':remote-address :incoming :method :url :status-code :res-headers[content-length] - :response-time ms',
      excludes: '*',
      streams: [{ level: 'debug', stream: process.stdout }],
    }))

  app.use(cors())

  app.use(isAuthenticated)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    debug: false, // Set false to disable traces in error extensions
    // This can be used to manipulate the errors before sending to clients
    formatError: error => {
      console.log(error)
      return error
    },
  })

  server.applyMiddleware({
    app,
  })

  return app
}

export {
  setupApp,
}