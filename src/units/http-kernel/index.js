// import factory server
import factoryServer from '../../support/http/factory'

// import core unit.
import { middleware } from '../core'

// import route definitions
import routeDefinitions from './route-definitions'

const httpKernel = factoryServer(middleware, routeDefinitions)

// default router export.
export default httpKernel
