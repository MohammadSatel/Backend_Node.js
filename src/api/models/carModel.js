// src/api/models/carModel.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  type: { type: String, required: true }, // e.g., SUV, sedan, coupe
  brand: { type: String, required: true }, // could be the same as make or different
  rating: { type: Number, default: 0 }, // average car rating
  features: [{ type: String, enum: ['GPS', 'Air Conditioning', 'Heated Seats'] }], // Features with validation
}, { timestamps: true }); // Add timestamps to each document

module.exports = mongoose.model('Car', carSchema);
