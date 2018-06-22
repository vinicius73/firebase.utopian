// import express router.
import { Router } from 'express'
// import { prepareHandler } from 'src/support/http/routes'
import prepareHandler from 'src/support/http/prepareHandler'

// import login handler.
import { handler as loginHandler } from './handlers/login'

// create a router instance for the unit.
const router = new Router()

// handle post to /auth/login.
router.post('/login', prepareHandler(loginHandler))

// default router export.
export default router
