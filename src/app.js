// src/app.js
import express from 'express'
import session from 'express-session'
import expressLayouts from 'express-ejs-layouts'
import path from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }))

// Setup view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)

// Setup session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set true if using https
}))

// Example route
app.use('/', router)

export default app
