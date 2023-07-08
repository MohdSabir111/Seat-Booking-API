require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
require("./config/dbConfig")

const seatsRouter = require('./routers/seatsRouter');

const app = express();
app.use(bodyParser.json());
app.use(seatsRouter);   // to use routes 

app.get('/',async(req,res)=>{
res.send("<div style='background-color : black'>  <h1 style='text-align : center; color:white'> Welcome To Seat Booking API </h1><p  style='text-align : center; color:white'> It is an API that is used to Display the working of Seat Booking. I have made 3 type pf classes['First,Business,Economy'] for booking the seats.<p> </div>");
})


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
