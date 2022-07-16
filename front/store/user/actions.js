import config from '~/config/index'

export default {
  getUsers({ rootState }) {
    return this.$axios.get(`${config.apiPath}/userlist`)
  },
  getUserById({ rootState }, id) {
    return this.$axios.get(`${config.apiPath}/userlist/${id}`)
  }
}
