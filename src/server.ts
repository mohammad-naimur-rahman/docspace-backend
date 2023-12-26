import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import { envVars } from './config'
import { errorlogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(envVars.DATABASE_URL as string)
    logger.info(`🛢 Database is connected successfully!`)

    server = app.listen(envVars.PORT, () => {
      logger.info(`Application  listening on port ${envVars.PORT}`)
    })
  } catch (err) {
    errorlogger.error('Failed to connect database', err)
  }

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed')
      })
    }
    process.exit(1)
  }

  const unexpectedErrorHandler = (error: unknown) => {
    errorlogger.error(error)
    exitHandler()
  }

  process.on('uncaughtException', unexpectedErrorHandler)
  process.on('unhandledRejection', unexpectedErrorHandler)

  process.on('SIGTERM', () => {
    console.info('SIGTERM is received')
    if (server) {
      server.close()
    }
  })
}

bootstrap()
