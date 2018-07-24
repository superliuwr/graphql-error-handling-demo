import * as Chance from 'chance'
import { ApolloError, UserInputError } from 'apollo-server-express'
import { childLogger } from '../logger'

const chance = Chance()

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
      code: chance.string(),
      name: chance.string(),
    }
  }

  const err = new Error('Not Found')
  logger.error({ err, args }, 'getPublisherById - an error occurred when querying publisher')
  throw err
}

const createPublisher = async (parent, args): Promise<PublisherInstance> => {
  const createPublisherInput: CreatePublisherInput = args.createPublisherInput
  const { code } = createPublisherInput

  if ( code === 'invalid-code') {
    const err = new UserInputError('Invalid code', {
      invalidArgs: ['code']
    })
    logger.error({ err, args }, 'createPublisher - an error occurred when creating publisher')
    throw err
  }

  if ( code === 'error-code') {
    const err = new ApolloError('Server error', 'SERVER_ERROR', {
      cause: 'Unknown'
    })
    logger.error({ err, args }, 'createPublisher - an error occurred when creating publisher')
    throw err
  }

  return {
    id: chance.pickone([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    code: chance.string(),
    name: chance.string()
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