//API for signUp and Login

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret=process.env.JWT_SECRET
const {authenticateToken}=require("./userAuth")
//sign up
router.post("/sign-up",async(req,res)=>{
    try{
        const {username , email , password,address}= req.body;
        //checking length of username
        if(username.length<5){
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

        // Determine user role
        let role = "user"; // Default role
        if (username === "admin" && password === "admin") {
            role = "admin"; // Assign admin role
        }
        //allow user to sign up
        const newUser = new User({
            username:username ,
            email:email , 
            password:hashPass ,
            address: address,
            role,
        });
        await newUser.save();
        return res.status(200).json({message: "SignUp Successfully"});
    }catch(error){
        res.status(500).json({ message : "Internal server error"});
    }
})

//sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check if the user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check the password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

         // Assign role based on username/password (if "admin")
         let role = existingUser.role;
         if (username === "admin" && password === "admin") {
             role = "admin";
         }

        // JWT expects a plain object for signing
        const authClaims = {
            name: existingUser.username,
            role: existingUser.role,
            id:existingUser._id,
        };

        // Generate the token
        const token = jwt.sign(authClaims, jwt_secret, { expiresIn: "30d" });

        // Respond with user info and token
        return res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//get user info
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try{
        //check if user-available
        const {id} = req.headers;
        const data= await User.findById(id).select("-password");//excluding password so that it is not showed on getting user info
        return res.status(200).json(data);
    }catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
})

//api for updating address->put req for updation
//authenticatToken to check user is changing his own address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});
    }catch(error){
        res.status(500).json({message:"Internal Server error"})

    }
    // console.log("PUT /update-address hit");
    // console.log("Headers:", req.headers);
    // console.log("Body:", req.body);
})

router.get("/my-orders", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;  
      const user = await User.findById(id).populate("orders"); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ orders: user.orders });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


module.exports = router;