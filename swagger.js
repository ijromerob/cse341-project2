const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Rebel Alliance API',
    description:
      'This API will bring balance to the force and information about the starships used and their pilots',
  },
  host: 'localhost:9001',
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
