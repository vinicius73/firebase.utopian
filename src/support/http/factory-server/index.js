// imports.
import { forEach } from 'lodash'
// import express router.
import { Router } from 'express'
// import core unit.
import { registryRoutes } from './routes'

const factoryServer = (middlewares, routeDefinitions) => {
  // create a router instance
  const httpKernel = new Router()

  // loop enabling all middleware.
  forEach(middlewares.pre, middleware => {
    httpKernel.use(middleware)
  })

  // registry route definitions
  registryRoutes(httpKernel, routeDefinitions)

  return httpKernel
}

export default factoryServer
