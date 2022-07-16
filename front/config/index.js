import development from './development'
import production from './production'

let config = null
const common = {
  apiPath: '/api'
}

if (process.env.APP_API === 'server') {
  config = { ...common, ...production }
} else {
  config = { ...common, ...development }
}

export default Object.freeze(config)
