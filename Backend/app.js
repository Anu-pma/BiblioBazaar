const express = require("express"); //req express in a var
const app = express(); //now app can use all functionalities of exp
require("dotenv").config(); //requiring configfile of .env
require("./connec/conn");
const User=require("./routes/user")
const Books= require("./routes/book")
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart")
const Order = require("./routes/order")
app.use(express.json()); //data is coming in json format
//routes
app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);
//creating port
app.listen(process.env.PORT,() => {
    console.log(`Server Started ${process.env.PORT}`);
});
