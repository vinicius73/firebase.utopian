import { forEach, castArray } from 'lodash'
import { Router } from 'express'
import prepareHandler from '../../prepareHandler'

const getHandlers = route => {
  const handlers = castArray(route.handler)
  const last = prepareHandler(handlers.pop())

  return [...handlers, last]
}

const addRoutesToRouter = (router, routes) => {
  forEach(routes, route => {
    const { methods, path } = route
    forEach(castArray(methods), method => {
      router[method](path, ...getHandlers(route))
    })
  })

  return router
}

const routerFactory = definition => {
  const router = new Router()
  const { routes } = definition

  return addRoutesToRouter(router, routes)
}

const registerRouterDefinition = (httpKernel, definition) => {
  const router = routerFactory(definition)

  httpKernel.use(definition.prefix, router)

  return httpKernel
}

export { registerRouterDefinition }
