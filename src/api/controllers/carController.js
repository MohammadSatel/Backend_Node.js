// src/api/controllers/carController.js

const Car = require('../models/carModel');

// Create a new car in the database
exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send({ message: 'Error creating the car', error });
  }
};

// Retrieve all cars from the database
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.send(cars);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching cars', error });
  }
};

// Retrieve a single car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).send({ message: 'Car not found' });
    }
    res.send(car);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching the car', error });
  }
};

// Update a car by ID
exports.updateCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) {
      return res.status(404).send({ message: 'Car not found' });
    }
    res.send(car);
  } catch (error) {
    res.status(400).send({ message: 'Error updating the car', error });
  }
};

// Delete a car by ID
exports.deleteCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).send({ message: 'Car not found' });
    }
    res.send({ message: 'Car successfully deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting the car', error });
  }
};

// Search for cars in the database based on query parameters
exports.searchCars = async (req, res) => {
  try {
    let query = {};
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    const { type, brand, minYear, maxYear, features } = req.query;

    if (type) query.type = type;
    if (brand) query.brand = brand;
    if (minYear) query.year = { $gte: minYear };
    if (maxYear) query.year = { ...query.year, $lte: maxYear };
    if (features) query.features = { $all: features.split(',') };

    const cars = await Car.find(query)
                          .limit(limit)
                          .skip(limit * (page - 1));

    const totalCars = await Car.countDocuments(query);

    res.status(200).json({ data: cars, page, limit, total: totalCars });
  } catch (error) {
    res.status(500).json({ message: 'Error searching for cars', error });
  }
};
