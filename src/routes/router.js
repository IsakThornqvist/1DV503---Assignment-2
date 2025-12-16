import express from 'express'
import http from 'node:http'

import { router as homeRouter } from './homeRouter.js'
import { router as registerRouter } from './registerRouter.js'


export const router = express.Router()

router.use('/', homeRouter)
router.use('/register', registerRouter)




router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
