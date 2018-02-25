import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import chalk from 'chalk'
import path from 'path'
import config from '../config/config.json'
import crossOrigin from './core/crossOrigin'

// routes
import account from './routes/account'

// load env variables
dotenv.load({ path: `./config/.env.${process.env.NODE_ENV || 'development'}` })

// configure express app
const app = express()
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

// Middlewares
app.use(logger('dev'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(crossOrigin())

// Here you can put all your routes controllers:
app.use(config.prefix + '/account', account)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.format({
    text: () => {
      res.send({
        error: {
          message: err.message,
          code: err.status || 500,
        },
      })
    },
    html: () => {
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
      res.render('error')
    },
    json: () => {
      res.json({
        error: {
          message: err.message,
          code: err.status || 500,
        },
      })
    },
  })
})

app.listen(app.get('port'), () => {
  console.log('%s App is listening at http://localhost:%s in %s mode', chalk.green('✓'), app.get('port'), chalk.red(app.get('env')))
  console.log('  Press CTRL-C to stop\n')
})

export default app
