const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const morgan = require('morgan')
const nunjucks = require('nunjucks')

// *** view folders *** //
const viewFolders = [
  path.join(__dirname, '..', 'views')
]

// *** load environment variables *** //
require('dotenv').config()

module.exports.init = (app, express) => {
  // *** view engine *** //
  nunjucks.configure(viewFolders, {
    express: app,
    autoescape: true
  })
  app.set('view engine', 'html')

  // *** app middleware *** //
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true
  }))
  app.use(flash())
  app.use(express.static(path.join(__dirname, '..', '..', 'client')))
}
