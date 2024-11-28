const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('./data/database');
const routes = require('./routes');
const { createErrorResponse } = require('./utilities');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 9001;

/**
 * Error handling
 */
// To check if there is a problem with promises
process.on('unhandledRejection', (error) => {
  throw error;
});

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
  console.log(error);
});

app.use(bodyParser.json());

app.use(
  session({
    secret: 'secrete',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.use(cors({ origin: '*' }));

app.use('/', routes);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(createErrorResponse(500, 'Internal Server Error'));
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
