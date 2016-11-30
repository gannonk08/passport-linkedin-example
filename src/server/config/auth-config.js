const passport = require('passport')
const LinkedInStrategy = require('passport-linkedin').Strategy

module.exports.init = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    // Later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from LinkedIn.
    console.log('\nserializeUser:', user)
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    // Here is where you will go to the database and get the user each time from it's id, after you set up your database.
    console.log('\ndeserializeUser:', obj)
    done(null, obj)
  })

  passport.use(new LinkedInStrategy({
    consumerKey: process.env.LINKEDIN_API_KEY,
    consumerSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: 'http://localhost:3000/linkedin/callback',
    scope: ['r_emailaddress', 'r_basicprofile']
  }, (token, tokenSecret, profile, done) => {
    console.log('\npassport callback:', token, tokenSecret, profile)
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead (so perform a knex query here later).

    return done(null, profile)
  }))
}
