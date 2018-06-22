// imports.
import { each } from 'lodash'

// import express router.
import { Router } from 'express'

// import core unit.
import * as core from './core'
// import auth unit.
import * as auth from './auth'

// create a router instance for the unit.
const httpKernel = new Router()

// loop enabling all middleware.
each(core.middleware.pre, (m) => {
  httpKernel.use(m)
})

// core routes.
httpKernel.use('/', core.routes)
// auth routes.
httpKernel.use('/auth', auth.routes)

// loop enabling all middleware.
each(core.middleware.post, (m) => {
  httpKernel.use(m)
})

// default router export.
export default httpKernel
