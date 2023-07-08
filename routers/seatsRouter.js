const router = require('express').Router();
const controllerSeat = require('../controllers/seatsController');
const controllerBooking = require('../controllers/bookingController')



// Get all Seat API and Exports as CSV
router.get('/all-seat-csv',controllerSeat.Getall);


// Get Seat Pricing API and Exports as CSV
router.get('/seat-pricing-CSV/:id',controllerSeat.seatPricingCsv )

// Create Booking API
router.post('/booking',controllerBooking.createBooking);

// Create a new seat
router.post('/seats',controllerSeat.createNewSeat);

// Get All Seats API
router.get('/seats',controllerSeat.getAllSeats);

  // Get Seat Pricing API
router.get('/seats/:id',controllerSeat.getSeatPricing );

// Retrieve Bookings API
router.get('/bookings',controllerBooking.retrieveBookings);

// Delete Seat API
router.delete('/seats/:id',controllerSeat.deleteSeat)


// Delete Booking API
router.delete('/booking/:id',controllerBooking.deleteBooking)



module.exports = router;