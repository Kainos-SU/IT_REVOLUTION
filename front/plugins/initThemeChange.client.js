export default function({ app, store }) {
  store.commit('theme/set_theme')

  store.watch(
    (state) => state.theme.dark_theme,
    (current) => {
      app.context.$vuetify.theme.dark = current
    },
    { immediate: true }
  )
}
