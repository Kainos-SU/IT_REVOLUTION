export default function({ app, store, redirect }) {
  app.$axios.onRequest((config) => {
    if (store.getters.accessToken) {
      app.$axios.setToken(store.getters.accessToken);
    } else {
      app.$axios.setToken(undefined);
    }
    console.log(config.headers);
  })

  app.$axios.onError(() => {})
}
