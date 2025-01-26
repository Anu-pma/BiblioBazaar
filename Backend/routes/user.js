//API for signUp and Login

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("")
//sign up
router.post("/sign-up",async(req,res)=>{
    try{
        const {username , email , password,address}= req.body;
        //checking length of username
        if(usernmame.length<5){
            return res
            .status(400)
            .json({message:"Username length should br greater than 5"}); //400 is error bcz of user
        }

        //checking username already exist(using model of user)
        const existingUsername = await User.findOne({username: username});
        if(existingUsername){
            return res
            .status(400)
            .json({message:"Username already exists"}); //400 is error bcz of user
        }

        //checking email already exist(using model of user)
        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
            return res
            .status(400)
            .json({message:"Email already exists"}); //400 is error bcz of user
        }

        //checking length of password
        if(password.length<5){
            return res
            .status(400)
            .json({message:"Password's length should be greater than 5"}); //400 is error bcz of user
        }
        //hashing the password
        const hashPass = await bcrypt.hash(password,10);//10 times hashing
        //allow user to sign up
        const newUser = new User({
            username:username ,
            email:email , 
            password:hashPass ,
            address: address,
        });
        await newUser.save();
        return res.status(200).json({message: "SignUp Successfully"});
    }catch(error){
        res.status(500).json({ message : "Internal server error"});
    }
})

//sign in
router.post("/sign-in",async(req,res)=>{
    try{
        //checking for existing username
        const {username,password} = req.body;
        const existingUser = await User.findOne({ username});
        if(!existingUser)
        {
            res.status(400).json({ message: "Invalid credentials"});
        }
        //checking for right password
        await bcrypt.compare(password,existingUser.password,(err,data)=> {
            if(data){
                const authClaims = [
                    {name : existingUser.username},
                    {role : existingUser.role}
                ]

                //using jw tokens
                const token = jwt.sign(authClaims,"biblio",{expiresIn: "30d",}) //secret key is biblio
                // res.status(200).json({ message: "Signed In successfully"});
                //instead of printed signed successfully...print id and role
                res.status(200).json({ id: existingUser._id,role: existingUser.role,token: token});
            }
            else{
                res.status(400).json({ message: "Invalid credentials"});
            }
        });
    }catch(error){
        res.status(500).json({ message : "Internal server error"});
    }
})
module.exports = router;