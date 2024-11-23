const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const routes = require('./routes');
const port = process.env.PORT || 9001;
const { createErrorResponse } = require('./utilities');

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

app.use('/', routes);

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
