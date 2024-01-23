const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');

exports.createBooking = async (req, res) => {
  try {
    const { user, car, startDate, endDate } = req.body;

    // Find the car to get the price per day
    const carDetails = await Car.findById(car);
    if (!carDetails) {
      return res.status(404).send({ message: 'Car not found' });
    }

    // Calculate the total days
    const totalDays = (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24) + 1;

    // Calculate the total price
    const totalPrice = carDetails.pricePerDay * totalDays;

    const booking = new Booking({ user, car, startDate, endDate, totalPrice });
    await booking.save();

    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};
