const Seat = require('../models/seatSchema');
const Booking = require('../models/bookingSchem');
const { Router } = require('express');

const fs = require('fs');

// Get all Seats and Exports as Csv
module.exports.Getall = async (req, res) => {
  try {
    const seats = await Seat.find().sort('seatClass');
    const csvData = convertSeatsToCSV(seats);
    const csvFilePath = 'seats.csv';

    fs.writeFileSync(csvFilePath, csvData, 'utf8');

    res.download(csvFilePath, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to download CSV file' });
      }
      fs.unlinkSync(csvFilePath); // Delete the temporary CSV file after download
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to convert seat data to CSV format
function convertSeatsToCSV(seats) {
  const headers = ['Seat Class', 'Minimum Price', 'Normal Price', 'Maximum Price'];
  const rows = seats.map((seat) => [
    seat.seatClass,
    seat.minPrice,
    seat.normalPrice,
    seat.maxPrice,
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
  return csvContent;
}




// Get Seat Pricing API and Exports as CSV
module.exports.seatPricingCsv= async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({ error: 'Seat not found' });
    }

    const price = await calculateSeatPrice(seat);
    const csvData = convertSeatPricingToCSV(seat, price);
    const csvFilePath = 'seat_pricing.csv';

    fs.writeFileSync(csvFilePath, csvData, 'utf8');

    res.download(csvFilePath, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to download CSV file' });
      }
      fs.unlinkSync(csvFilePath); // Delete the temporary CSV file after download
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Helper function to convert seat pricing data to CSV format
function convertSeatPricingToCSV(seat, price) {
  const headers = ['Seat Class','Seat Number','Price'];
  const row = [seat.seatClass,seat.seatNumber, price];

  const csvContent = [headers, row].map((row) => row.join(',')).join('\n');
  return csvContent;
}





// Create a new seat
module.exports.createNewSeat = async (req, res) => {
  try {
    const seatData = req.body;
    const newSeat = new Seat(seatData);
    const savedSeat = await newSeat.save();
    res.status(201).json(savedSeat);
  } catch (err) {
    res.status(500).json({ error: `${err} ***Unable to create a new seat.` });
  }
};



// Get All Seats API
module.exports.getAllSeats = async (req, res) => {
    try {
      const seats = await Seat.find().sort('seatClass');
      res.json(seats);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  // Get Seat Pricing API
     module.exports.getSeatPricing = async (req, res) => {
      try {
        const seat = await Seat.findById(req.params.id);
        if (!seat) {
          return res.status(404).json({ error: 'Seat not found' });
        }
    
        const price = await calculateSeatPrice(seat);
    
        res.json({ seat, price });
      } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };

    // Helper function to calculate the price for a seat based on booking percentage
async function calculateSeatPrice(seat) {
  const totalSeats = await Seat.countDocuments({ seatClass: seat.seatClass });
  const bookedSeats = await Booking.countDocuments({ seat: seat._id });
  const bookingPercentage = (bookedSeats / totalSeats) * 100;
 

  let price;
  if (bookingPercentage < 40) {
    price = seat.minPrice || seat.normalPrice;
  } else if (bookingPercentage >= 40 && bookingPercentage <= 60) {
    price = seat.normalPrice || seat.maxPrice;
  } else {
    price = seat.maxPrice || seat.normalPrice;
  }

  return price;
}

// Delete a seat
    module.exports.deleteSeat =  async (req, res) => {
      try {
        const seatId = req.params.id;
    
        // Check if the seat exists
        const seat = await Seat.findById(seatId);
        if (!seat) {
          return res.status(404).json({ error: 'Seat not found' });
        }
    
        // Check if the seat is booked
        const isSeatBooked = await Booking.exists({ seat: seatId });
        if (isSeatBooked) {
          return res.status(409).json({ error: 'Cannot delete a booked seat' });
        }
    
        // Delete the seat
        await Seat.findByIdAndDelete(seatId);
    
        res.json({ message: 'Seat deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    



