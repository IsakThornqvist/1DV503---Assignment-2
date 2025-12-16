import express from 'express'
import http from 'node:http'

import { router as homeRouter } from './homeRouter.js'
import { router as registerRouter } from './registerRouter.js'
import { router as loginRouter } from './loginRouter.js'
import { router as bookRouter } from './bookRouter.js'


export const router = express.Router()

router.use('/', homeRouter)
router.use('/register', registerRouter)
router.use('/login', loginRouter)
router.use('/books', bookRouter)





router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
