const cors = require("cors");
const express = require("express"); 
const app = express(); 
require("dotenv").config(); 
require("./connec/conn");
const User=require("./routes/user")
const Books= require("./routes/book")
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart")
const Order = require("./routes/order")
const GoogleAuth=require("./routes/googleAuth")

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));

app.use(express.json()); //data is coming in json format

//routes
app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);
app.use("/api/v1",GoogleAuth);

app.listen(process.env.PORT,() => {
    console.log(`Server Started ${process.env.PORT}`);
});
