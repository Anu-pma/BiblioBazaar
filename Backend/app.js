const express = require("express"); //req express in a var
const app = express(); //now app can use all functionalities of exp
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
