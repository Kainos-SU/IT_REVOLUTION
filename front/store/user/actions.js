import config from '~/config/index'

export default {
  getUsers({ rootState }, pageNumber) {
    return this.$axios.get(`${config.apiPath}/userlist?page=${pageNumber}`)
  },
  getUserById({ rootState }, id) {
    return this.$axios.get(`${config.apiPath}/userlist/${id}`)
  },
  deleteUser({ rootState }, payload) {
    return this.$axios.delete(`${config.apiPath}/userlist/${payload.id}`, {data: { _id: payload.adminId, password: payload.password }})
  },
  async getCurrentUser({ commit }, id) {
    const response = await this.$axios.get(`${config.apiPath}/userList/${id}`)
    commit('SET_CURRENT_USER', response.data.user)
  }
}
