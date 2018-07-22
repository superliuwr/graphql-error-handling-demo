import * as express from 'express'
import * as server from './server'
import { childLogger } from './logger'

const logger = childLogger(__filename)

process.on('uncaughtException', err => {
  logger.error({ err }, `uncaughtException ${err.message}`)
  process.exit(1)
}).on('unhandledRejection', (reason, p) => {
  logger.error({ reason, p }, `unhandledRejection ${reason}`)
})

const listen = (name: string, port: number) => (app: express.Express) => {
  app.listen(port, () => {
    logger.info(`Express ${name} server running at http://0.0.0.0:${port}/`)
  })
}

Promise.all([
  server.setupApp().then(listen('main', 3000)),
]).catch((err => {
  logger.error({ err }, 'Fail to start apps')
}))