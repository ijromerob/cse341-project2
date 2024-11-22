const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// This controller will retrieve all ships
const getAllShips = async (req, res) => {
  //#swagger.tags=['Ships']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-alliance-ships')
    .find();

  result.toArray().then((ships) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(ships);
  });
};

// This controller will retrieve a specific ship
const getShip = async (req, res) => {
  //#swagger.tags=['Ships']
  const shipId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-alliance-ships')
    .find({ _id: shipId });

  result.toArray().then((ship) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(ship[0]);
  });
};

// this controller will add a new ship to the fleet
const addNewShip = async (req, res) => {
  //#swagger.tags=['Ships']

  const ship = {
    name: req.body.name,
    class: req.body.class,
    manufacturer: req.body.manufacturer,
    length: req.body.length,
    hyperdrive_rating: req.body.hyperdrive_rating,
    armament: req.body.armament,
    crew: req.body.crew,
    production_start_date: req.body.production_start_date,
    is_hyperspace_capable: req.body.is_hyperspace_capable,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-alliance-ships')
    .insertOne(ship);

  if (0 < result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while adding a new ship');
  }
};

//this controller updates a ship's information
const updateShip = async (req, res) => {
  //#swagger.tags=['Ships']

  const ship = {
    name: req.body.name,
    class: req.body.class,
    manufacturer: req.body.manufacturer,
    length: req.body.length,
    hyperdrive_rating: req.body.hyperdrive_rating,
    armament: req.body.armament,
    crew: req.body.crew,
    production_start_date: req.body.production_start_date,
    is_hyperspace_capable: req.body.is_hyperspace_capable,
  };

  const shipId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-alliance-ships')
    .replaceOne({ _id: shipId }, ship);

  if (0 < result.modifiedCount) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while updating the ship');
  }
};

//This controller will delete a ship
const deleteShip = async (req, res) => {
  //#swagger.tags=['Ships']

  const shipId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('rebel-alliance-ships')
    .deleteOne({ _id: shipId }, true);

  if (0 < result.deletedCount) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while deleting the ship');
  }
};

module.exports = { getAllShips, getShip, addNewShip, updateShip, deleteShip };
