import gql from 'graphql-tag'
import { apolloClient } from '@/store/apollo'
import { getPublisherById, newPublisher } from '@/gql/publisher'

const state = {
    publisher: null
}
const getters = {
  // ...
}
const mutations = {
  setPublisher: (state, publisher) => {
    state.publisher = publisher
  },
}
const actions = {
  async getPublisher({ commit }, id) {
    const { data } = await apolloClient.query({
      query: getPublisherById,
      variables: {
        id,
      }
    })

    commit('setPublisher', data['getPublisherById'])
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
