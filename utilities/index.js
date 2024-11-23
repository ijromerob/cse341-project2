const mongoose = require('mongoose');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

const createErrorResponse = (status, message) => {
  return { status, message };
};

module.exports = { handleErrors, validateObjectId, createErrorResponse };
