// imports.
import { forEach } from 'lodash'
// import express router.
import { Router } from 'express'
// import core unit.
import { registryRoutes } from './routes'

const factoryServer = (middlewares, routeDefinitions) => {
  // create a router instance for the unit.
  const httpKernel = new Router()

  // loop enabling all middleware.
  forEach(middlewares.pre, middleware => {
    httpKernel.use(middleware)
  })

  registryRoutes(httpKernel, routeDefinitions)

  return httpKernel
}

export default factoryServer
