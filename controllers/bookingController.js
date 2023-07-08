const Seat = require('../models/seatSchema');
const Booking = require('../models/bookingSchem');

const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Create Twilio client
const twilioClient = twilio(accountSid, authToken);


// Create Booking API
module.exports.createBooking= async (req, res) => {
    try {
      const { seatIds, userName, phoneNumber } = req.body;
      
  const bookedSeats = await Booking.find({ seat: { $in: seatIds } });
      if (bookedSeats.length > 0) {
        return res.status(409).json({ error: 'Seats are already booked' });
      }
  
      let totalAmount = 0;
      for (const seatId of seatIds) {
        const seat = await Seat.findById(seatId);
        if (!seat) {
          return res.status(404).json({ error: 'Seat not found' });
        }
  
        const seatPrice = await calculateSeatPrice(seat);
        totalAmount += seatPrice;
      }
  
      const booking = new Booking({
        seat: seatIds,
        userName,
        phoneNumber,
      });
      await booking.save();
      await sendBookingConfirmationSMS(userName, phoneNumber);
  
      res.json({ bookingId: booking._id, totalAmount });
    } catch (err) {
      res.status(500).json({ error:`${err} ** Internal server error` });
    }
  };
  

  //Helper function to calculate the price for a seat based on booking percentage
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


// Send booking confirmation SMS
async function sendBookingConfirmationSMS(userName, phoneNumber) {
  try {
    const message = `Dear ${userName}, your booking has been confirmed.`;

    // Send SMS via Twilio
    await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log('Booking confirmation SMS sent successfully');
  } catch (err) {
    console.error('Error sending booking confirmation SMS:', err);
  }
}


// Retrieve Bookings API
module.exports.retrieveBookings =  async (req, res) => {
  try {
    const userIdentifier = req.query.userIdentifier;
    if (!userIdentifier) {
      return res.status(400).json({ error: 'User identifier is required' });
    }

    const bookings = await Booking.find({
      $or: [{ userName: userIdentifier }, { phoneNumber: userIdentifier }],
    }).populate('seat','seatNumber seatClass');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Booking API
module.exports.deleteBooking= async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


