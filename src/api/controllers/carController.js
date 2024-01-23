// src/api/controllers/carController.js

const Car = require('../models/carModel');

exports.createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.send(cars);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add more functions as needed for updating, deleting, etc.

