const router = require('express').Router();
const pilotsController = require('../controllers/pilotsController');
const { handleErrors, validateObjectId } = require('../utilities');
const { pilotRules, validatePilot } = require('../utilities/pilotValidation');
const { isAuthenticated } = require('../utilities/authenticate');

// This route will retrieve all the pilots of the rebel alliance
router.get('/', handleErrors(pilotsController.getAllPilots));

// This route will retrieve the information of one pilot of the rebel alliance based on the id
router.get('/:id', validateObjectId, handleErrors(pilotsController.getPilot));

// This route will add a new pilot for the rebel alliance
router.post(
  '/',
  isAuthenticated,
  pilotRules(),
  validatePilot,
  handleErrors(pilotsController.addNewPilot)
);

// This route will modify the information of a pilot in the rebel alliance
router.put(
  '/:id',
  isAuthenticated,
  pilotRules(),
  validatePilot,
  handleErrors(pilotsController.updatePilot)
);

// This route will delete a pilot of the rebel alliance from the database
router.delete(
  '/:id',
  isAuthenticated,
  validateObjectId,
  handleErrors(pilotsController.deletePilot)
);

module.exports = router;
