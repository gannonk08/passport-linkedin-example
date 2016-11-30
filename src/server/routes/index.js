const express = require('express')
const router = express.Router()

router.get('/', home)

function home (req, res, next) {
  res.render('index', { title: 'Welcome to Express!' })
}

module.exports = router
