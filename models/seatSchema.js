const mongoose = require('mongoose');

// Define Seat Schema and Model
const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, index: true,unique:true,required: true},
    seatClass: { type: String, enum: ['economy', 'business', 'first'], required: true },
    isBooked: { type: Boolean, default: false },
    minPrice: { type: Number, required: true },
    normalPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
  });
  const Seat = mongoose.model('Seat', seatSchema);
   Seat.createIndexes();
   module.exports = Seat;