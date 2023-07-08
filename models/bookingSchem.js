const mongoose = require('mongoose');

// Define Booking Schema and Model
const bookingSchema = new mongoose.Schema({
    seat:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true }],
    userName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
  });
  const Booking = mongoose.model('Booking', bookingSchema);
  module.exports =Booking;