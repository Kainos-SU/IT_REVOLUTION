export default function({ route, store, redirect, $cookies }) {
  const isAuthenticated = store.state.accessToken
  if (route.path.includes('/login')) {
    return false
  } else if (isAuthenticated) {
    return false
  } else if (!isAuthenticated || !store.state.user) {
    $cookies.set('token', null)
    redirect('/login')
  }
}
