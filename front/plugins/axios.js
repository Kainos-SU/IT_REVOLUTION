export default function({ app, store, redirect }) {
  app.$axios.onRequest((config) => {
    const accessToken = store.getters.accessToken
    if (accessToken) {
      config.headers.common['Authorization'] = accessToken
    } else {
      console.log('Token is missing')
    }
  })

  app.$axios.onError(() => {})
}
