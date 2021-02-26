import path from 'path'
const __dirname = path.resolve()
const dist = path.join(__dirname, 'dist')

import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import connectToDb from './lib/connectToDb.js'
import errorHandler from './middleware/errorHandler.js'
import { port } from './config/environment.js'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

async function startServer() {
  await connectToDb()

  console.log('🤖 Successfully connected to mongo!')

  app.use(express.json())

  app.use(logger)

  app.use('/api', router)

  app.use(errorHandler)

  app.use('/', express.static(dist))

  app.get('*', function(req, res) {
    res.sendFile(path.join(dist, 'index.html'))
  })

  app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
}

startServer()


//!! we are exporting our express server so we can use it for testing
export default app


