const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const uploadCatalog= require('./Routes/UploadRoute');
const userCatalog = require('./Routes/UserRoute');
const corsOptions = {
  origin:"http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyparser.json());
mongoose
  .connect(process.env.REACT_APP_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  })
  .then(() => console.log("connected to DB"))
  .catch(console.error);

app.get("/", async(req, res) => {
  res.json("The backend server running successfully!!!");
});

app.use('/User' , userCatalog);
app.use('/Upload' , uploadCatalog);




app.listen(process.env.REACT_APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.REACT_APP_PORT}`);
});