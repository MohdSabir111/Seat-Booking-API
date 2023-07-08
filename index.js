require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
require("./config/dbConfig")

const seatsRouter = require('./routers/seatsRouter');

const app = express();
app.use(bodyParser.json());
app.use(seatsRouter);   // to use routes 



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
