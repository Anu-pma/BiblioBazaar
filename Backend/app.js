const express = require("express"); //req express in a var
const app = express(); //now app can use all functionalities of exp

// const mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://Anupma-1111:@bookcluster.s50ir.mongodb.net/?retryWrites=true&w=majority&appName=BookCluster");
// const User = require('./models/userModel');

require("dotenv").config(); //requiring configfile of .env
require("./connec/conn");
const user=require("./routes/user")
app.use(express.json()); //data is coming in json format
//routes
app.use("/api/v1",user);

//creating port
app.listen(process.env.PORT,() => {
    console.log(`Server Started ${process.env.PORT}`);
});
