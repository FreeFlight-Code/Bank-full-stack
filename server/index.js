require('dotenv').config();

const express = require('express') //main backend file
  , bodyParser = require('body-parser') //converts all files into something readable for express
  , session = require('express-session') //this tracks each log-in
  , passport = require('passport') //passport needs express-session
  , Auth0Strategy = require('passport-auth0')
  , massive = require('massive')
// , config = require('./config');

const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true
}).then(db => {
  app.set('db', db);
})

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {
  //if nothing is on profile you must check auth0, clients, advanced settings, turn off OIDC compliance

  const db = app.get('db');
  console.log(profile, 'profile')
  db.find_user([profile.identities[0].user_id])
    .then(user => {
      if (user[0]) {

        return done(null, { id: user[0].id });

      } else {

        db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.identities[0].user_id])
          .then(user => {
            return done(null, { id: user[0].id });
          })

      }
    })


}));

app.get('/auth', passport.authenticate('auth0')); //first time called no one is logged in

app.get('/auth/callback', passport.authenticate('auth0', { // second time they are loggedin, this is to check if they are it goes to either the success or failure redirect
  successRedirect: 'http://localhost:3000/#/private',
  failureRedirect: 'http://localhost:3000/#/'
}))

passport.serializeUser(function (user, done) {  // puts stuff on session
  done(null, user);
});

passport.deserializeUser(function (obj, done) { // whatever you pass through second argument on deserialize gets put on req-user
  app.get('db').find_session_user([obj.id])
    .then(user => {
      return done(null, user[0]);
    })
});

app.get('/auth/me', (req, res, next) => {
  if (!req.user) {
    return res.status(404).send('User not found');
  } else {
    return res.status(200).send(req.user);
  }
})

app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect(302, 'http://localhost:3000/#/');
})

let PORT = 3005;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})    
