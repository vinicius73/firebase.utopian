import { forEach } from 'lodash'
import { registerRouterDefinition } from './router'

const registryRoutes = (httpKernel, definitions) => {
  forEach(definitions, definition => {
    registerRouterDefinition(httpKernel, definition)
  })

  return httpKernel
}

export { registryRoutes }
