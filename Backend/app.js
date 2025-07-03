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

const allowedOrigins = [
  "http://localhost:5173",
  "https://bibliobazaar.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// app.use(cors({
//     origin: ["http://localhost:5173", "https://bibliobazaar.onrender.com"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
//   }));

app.use(express.json()); //data is coming in json format

//routes
app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);
app.use("/api/v1",GoogleAuth);

// app.listen(process.env.PORT,() => {
//     console.log(`Server Started ${process.env.PORT}`);
// });
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
