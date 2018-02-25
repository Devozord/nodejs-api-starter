import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import chalk from 'chalk'
import config from '../config/config.json'
import * as errorHandler from './core/errorHandler'

// routes
import account from './routes/account'

// load env variables
dotenv.load({ path: `./config/.env.${process.env.NODE_ENV || 'development'}` })

// configure express app
const app = express()
app.set('port', process.env.PORT || 5000)

// Middlewares
app.use(logger('dev'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Here you can put all your routes controllers:
app.use(config.prefix + '/account', account)

// catch 404 and forward to error handler
app.use(errorHandler.notFound)

// error handler
app.use(errorHandler.unexpected)

app.listen(app.get('port'), () => {
  console.log('%s App is listening at http://localhost:%s in %s mode', chalk.green('✓'), app.get('port'), chalk.red(app.get('env')))
  console.log('  Press CTRL-C to stop\n')
})

export default app
