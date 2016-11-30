const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', home)

function home (req, res, next) {
  res.render('index', { title: 'Welcome to Express!' })
}

router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE' }))

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/'
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
