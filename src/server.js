import 'dotenv/config'
import app from './app.js'
import { testConnection } from './config/db.js'

const PORT = process.env.PORT || 3000

// Test database connection before starting server
const startServer = async () => {
  const dbConnected = await testConnection()
  
  if (!dbConnected) {
    console.error('Failed to connect to database. Exiting...')
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

startServer()