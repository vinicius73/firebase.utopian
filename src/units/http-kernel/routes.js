import { forEach } from 'lodash'
import { routes as core } from '../core'
import { routes as auth } from '../auth'

const routes = {
  '/': core,
  '/auth': auth
}

const registryRoutes = httpKernel => {
  forEach(routes, (router, key) => {
    httpKernel.use(key, router)
  })
}

export { registryRoutes }
