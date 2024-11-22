const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// This controller will retrive all pilots
const getAllPilots = async (req, res) => {
  // #swagger tags=['Pilots']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-pilots')
    .find();

  result.toArray().then((pilots) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(pilots);
  });
};

// This controller will retrieve a specific pilot based on the ID
const getPilot = async (req, res) => {
  // #swagger tags=['Pilots']
  const pilotId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-pilots')
    .find({ _id: pilotId });

  result.toArray().then((pilot) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(pilot[0]);
  });
};

// This controller will add a new pilot to the database
const addNewPilot = async (req, res) => {
  // #swagger tags=['Pilots']
  const pilot = {
    name: req.body.name,
    species: req.body.species,
    homeworld: req.body.homeworld,
    rank: req.body.rank,
    years_of_service: req.body.years_of_service,
    piloting_skill: req.body.piloting_skill,
    famous_ship: req.body.famous_ship,
    is_force_sensitive: req.body.is_force_sensitive,
    first_flight_date: req.body.first_flight_date,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-pilots')
    .insertOne(pilot);

  if (0 < result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while adding a new ship');
  }
};

//this controller updates a pilot's information
const updatePilot = async (req, res) => {
  // #swagger tags=['Pilots']

  const pilot = {
    name: req.body.name,
    species: req.body.species,
    homeworld: req.body.homeworld,
    rank: req.body.rank,
    years_of_service: req.body.years_of_service,
    piloting_skill: req.body.piloting_skill,
    famous_ship: req.body.famous_ship,
    is_force_sensitive: req.body.is_force_sensitive,
    first_flight_date: req.body.first_flight_date,
  };

  const pilotId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-pilots')
    .replaceOne({ _id: pilotId }, pilot);

  if (0 < result.modifiedCount) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while updating the pilot');
  }
};

// This controller will delete a pilot
const deletePilot = async (req, res) => {
  // #swagger tags=['Pilots']

  const pilotId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-pilots')
    .deleteOne({ _id: pilotId }, true);

  if (0 < result.deletedCount) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while deleting the pilot');
  }
};
module.exports = {
  getAllPilots,
  getPilot,
  addNewPilot,
  updatePilot,
  deletePilot,
};
