import config from '~/config/index'

export default {
  login({ rootState }, payload) {
    return this.$axios.post(`${config.apiPath}/auth/login`, payload)
  },
  registration({ rootState }, payload) {
    return this.$axios.post(`${config.apiPath}/auth/register`, payload)
  }
}
