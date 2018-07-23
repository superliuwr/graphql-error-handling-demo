import gql from 'graphql-tag'

export const newPublisher = gql`
    mutation createPublisher($createPublisherInput: CreatePublisherInput!) {
      createPublisher(createPublisherInput: $createPublisherInput) {
        id
        name
        code
      }
    }
`
export const getPublisherById = gql`
    query getPublisherById($id: Int!) {
      getPublisherById(id: $id) {
        id
        code
        name
      }
    }
`
