const express = require("express"); //req express in a var
const app = express(); //now app can use all functionalities of exp
require("dotenv").config(); //requiring configfile of .env
require("./connec/conn");
const User=require("./routes/user")
const Books= require("./routes/book")


app.use(express.json()); //data is coming in json format
//routes
//app.get("/", (req, res) => res.send("Server is up and running"));

app.use("/api/v1",User);
app.use("/api/v1",Books);
//creating port
app.listen(process.env.PORT,() => {
    console.log(`Server Started ${process.env.PORT}`);
});
