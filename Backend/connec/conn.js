const mongoose = require("mongoose");
require('dotenv').config();

//defining a func
const conn = async() => {
    try{
        console.log('MongoDB URI:', process.env.URI);
        if(!process.env.URI){
            throw new Error("MongoDB connection URI is missing in environment variables.");
        }
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB");
    } catch(error){
        console.log(error);
    }
};
conn(); //calling the func