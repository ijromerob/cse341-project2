const router = require('express').Router();
const passport = require('passport');
const pilotRoutes = require('./pilotRoutes');
const shipsRoutes = require('./shipsRoutes');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send(
    req.session.user != undefined
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged Out'
  );
});

router.use('/pilots', pilotRoutes);

router.use('/ships', shipsRoutes);

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
