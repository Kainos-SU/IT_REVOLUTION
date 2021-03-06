export const state = () => {
  return {
    accessToken: null
  }
}

export const getters = {
  accessToken: (state) => state.accessToken
}
export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    const token = this.$cookies.get('token')
    if (token) {
      commit('SET_TOKEN', token)
    }
  },
  REMOVE_TOKEN({ commit }) {
    commit('SET_TOKEN', null)
    this.$cookies.remove('token')
  }
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.accessToken = token
  }
}
