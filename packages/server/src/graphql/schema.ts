import { gql } from 'apollo-server-express'

const typeDefs = gql`
type Publisher {
  id: Int!
  code: String!
  name: String!
}
input CreatePublisherInput {
  code: String!
  name: String!
}
type Query {
  getPublisherById(id: Int!): Publisher
}
type Mutation {
  createPublisher(createPublisherInput: CreatePublisherInput!): Publisher
}
`

export default typeDefs