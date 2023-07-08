const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://MohdSabir111:coder%40111@flight.8zaqexj.mongodb.net/seat-booking-system?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});