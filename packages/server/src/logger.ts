import * as bunyan from 'bunyan'
import * as path from 'path'

let streams: any = [{
  stream: process.stdout,
}]

if (process.env.LOG_FILE) {
  streams = [{
    path: process.env.LOG_FILE,
  }]
}

const logger = bunyan.createLogger({
  name: 'server',
  level: 'debug',
  streams,
  serializers: { err: bunyan.stdSerializers.err },
})

const childLogger = (filename: string) => {

  const relativeFilename = path.relative(`${__dirname}/..`, filename)
  const parts = path.dirname(relativeFilename).split(path.sep)

  parts.push(path.basename(relativeFilename, path.extname(relativeFilename)))

  return logger.child({
    logger: parts.join('#')
  })
}

export default logger

export { childLogger }