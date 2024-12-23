const router = require('express').Router();
const shipsController = require('../controllers/shipsController');
const { shipRules, validateShip } = require('../utilities/shipValidation');
const { handleErrors, validateObjectId } = require('../utilities');
const { isAuthenticated } = require('../utilities/authenticate');

// This route will retrieve all the ships of the rebel alliance
router.get('/', handleErrors(shipsController.getAllShips));

// This route will retrieve the information of one ship of the rebel alliance based on the id
router.get('/:id', validateObjectId, handleErrors(shipsController.getShip));

// This route will add a new ship for the rebel alliance
router.post(
  '/',
  shipRules(),
  isAuthenticated,
  validateShip,
  handleErrors(shipsController.addNewShip)
);

// This route will modify the specifications of a ship in the rebel alliance
router.put(
  '/:id',
  isAuthenticated,
  shipRules(),
  validateShip,
  validateObjectId,
  handleErrors(shipsController.updateShip)
);

// This route will delete a ship of the rebel alliance
router.delete(
  '/:id',
  isAuthenticated,
  validateObjectId,
  handleErrors(shipsController.deleteShip)
);

module.exports = router;
