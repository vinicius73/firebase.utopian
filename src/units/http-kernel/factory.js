// imports.
import { forEach } from 'lodash'
// import express router.
import { Router } from 'express'
// import core unit.
import { middleware } from '../core'
// import registry routes
import { registryRoutes } from './routes'
// import route definitions
import routeDefinitions from './route-definitions'

const factoryServer = () => {
  // create a router instance for the unit.
  const httpKernel = new Router()

  // loop enabling all middleware.
  forEach(middleware.pre, (m) => {
    httpKernel.use(m)
  })

  registryRoutes(httpKernel, routeDefinitions)

  return httpKernel
}

export default factoryServer
