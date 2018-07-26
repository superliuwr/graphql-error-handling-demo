import { apolloClient } from '@/store/apollo'
import { getPublisherById, newPublisher } from '@/gql/publisher'

const state = {
    publisher: null,
    getPublisherError: null,
    newPublisherError: null,
}
const getters = {
  // ...
}
const mutations = {
  setPublisher: (state, publisher) => {
    state.publisher = publisher
  },

  setGetPublisherError: (state, error) => {
    state.getPublisherError = error
  },

  setNewPublisherError: (state, error) => {
    state.newPublisherError = error
  }
}
const actions = {
  async getPublisher({ commit }, id) {
    try {
      const { data, errors } = await apolloClient.query({
        query: getPublisherById,
        variables: {
          id,
        },
        // Context to be passed to link execution chain
        context: {
          user: 'test-user',
        }
      })

      commit('setPublisher', data['getPublisherById'])
    } catch(err) {
      console.log(err.message)
      console.log(err.graphQLErrors)
      console.log(err.networkError)
      commit('setGetPublisherError', err)
    }
  },

  async newPublisher({}, payload) {
    const { data } = await apolloClient.mutate({
      mutation: newPublisher,
      variables: {
        createPublisherInput: {
          name: payload.name,
          code: payload.code
        },
      },
    })
  },
}

// Always namespace your vuex modules.
export const main = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
