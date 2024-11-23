const { body, validationResult } = require('express-validator');

function shipRules() {
  return [
    body('name').trim().escape().notEmpty().isLength({ min: 1 }),
    body('class').trim().escape().notEmpty().isLength({ min: 1 }),
    body('manufacturer').trim().escape().notEmpty().isLength({ min: 1 }),
    body('length')
      .isNumeric()
      .withMessage('The field must be a numeric value.')
      .custom((value) => {
        if (Number(value) <= 0) {
          throw new Error('starships must have a length greater than 0.');
        }
        return true;
      }),
    body('hyperdrive_rating')
      .isNumeric()
      .withMessage('The field must be a numeric value.')
      .custom((value) => {
        if (Number(value) <= 0) {
          throw new Error(
            'starships must have a hyperdrive rating greater than 0'
          );
        }
        return true;
      }),
    body('armament')
      .isArray({ min: 1 })
      .withMessage('The field must be an array.')
      .custom((array) => {
        if (!array.every((item) => typeof item === 'string')) {
          throw new Error('All items in the array must be strings.');
        }
        return true;
      }),
    body('crew')
      .isNumeric()
      .withMessage('The field must be a numeric value.')
      .custom((value) => {
        if (Number(value) <= 0) {
          throw new Error('starships must have at least 1 crew member.');
        }
        return true;
      }),
    body('production_start_date')
      .isDate({ format: 'YYYY-MM-DD' })
      .custom((value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight to only compare dates

        if (today < selectedDate) {
          throw new Error('The date cannot be in the future');
        }
        return true;
      })
      .withMessage('Please enter a valid date'),
    body('is_hyperspace_capable')
      .isBoolean()
      .withMessage('The field must be a boolean value'),
  ];
}

function validateShip(req, res, next) {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { shipRules, validateShip };
