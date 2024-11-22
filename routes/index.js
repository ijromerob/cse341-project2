const router = require('express').Router();

const pilotRoutes = require('./pilotRoutes');

const shipsRoutes = require('./shipsRoutes');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('hello world');
});

router.use('/pilots', pilotRoutes);

router.use('/ships', shipsRoutes);

module.exports = router;
