const router = require('express').Router();
const shipsController = require('../controllers/shipsController');
// const { shipRules, validateShip } = require('../utilities/shipValidation');
const { handleErrors } = require('../utilities');

// This route will retrieve all the ships of the rebel alliance
router.get('/', shipsController.getAllShips);

// This route will retrieve the information of one ship of the rebel alliance based on the id
router.get('/:id', shipsController.getShip);

// This route will add a new ship for the rebel alliance
router.post(
  '/',
  // shipRules(),
  // validateShip,
  shipsController.addNewShip
);

// This route will modify the specifications of a ship in the rebel alliance
router.put(
  '/:id',
  // shipRules(),
  // validateShip,
  shipsController.updateShip
);

// This route will delete a ship of the rebel alliance
router.delete('/:id', shipsController.deleteShip);

module.exports = router;
