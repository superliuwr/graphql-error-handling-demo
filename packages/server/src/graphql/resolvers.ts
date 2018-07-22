import { childLogger } from '../logger'

export interface CreatePublisherInput {
  code: string
  name: string
}

export interface PublisherInstance extends CreatePublisherInput {
  id: number
}

const logger = childLogger(__filename)

const getPublisherById = async (parent, args): Promise<PublisherInstance> => {
  if ( args.id === 1) {
    return {
      id: 1,
      code: 'test-code',
      name: 'test-name'
    }
  }

  const err = new Error('Not Found')
  logger.error({ err, args }, 'getPublisherById - an error occurred when querying publisher')
  throw err
}

const createPublisher = async (parent, args): Promise<PublisherInstance> => {
  const createPublisherInput: CreatePublisherInput = args.createPublisherInput
  const { name, code } = createPublisherInput

  if ( code === 'test-code') {
    return {
      id: 1,
      code: 'test-code',
      name: 'test-name'
    }
  } else {
    const err = new Error('Service Error')
    logger.error({ err, args }, 'createPublisher - an error occurred when creating publisher')
    throw err
  }
}

export default {
  Mutation: {
    createPublisher,
  },

  Query: {
    getPublisherById,
  },
}