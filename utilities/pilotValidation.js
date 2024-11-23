const { body, validationResult } = require('express-validator');

function pilotRules() {
  return [
    body('name').trim().escape().notEmpty().isLength({ min: 1 }),

    body('species').trim().escape().notEmpty().isLength({ min: 1 }),

    body('homeworld').trim().escape().notEmpty().isLength({ min: 1 }),

    body('rank').trim().escape().notEmpty().isLength({ min: 1 }),

    body('years_of_service')
      .isNumeric()
      .withMessage('The field must be a numeric value.')
      .custom((value) => {
        if (Number(value) <= 0) {
          throw new Error('Only pilots with more than 0 years of experience.');
        }
        return true;
      }),
    body('piloting_skill').trim().escape().notEmpty().isLength({ min: 1 }),

    body('famous_ship').trim().escape().notEmpty().isLength({ min: 1 }),

    body('is_force_sensitive')
      .isBoolean()
      .withMessage('The field must be a boolean value'),

    body('first_flight_date')
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
  ];
}

function validatePilot(req, res, next) {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { pilotRules, validatePilot };
