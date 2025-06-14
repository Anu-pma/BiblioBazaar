const jwt=require("jsonwebtoken");
const jwt_secret=process.env.JWT_SECRET

// midddleware to authenticate token
const authenticateToken=(req,res,next)=>{
    //extract "authorization" header
    const authHeader= req.headers["authorization"];
    //extract token from header (Bearer generated_token)
    const token= authHeader && authHeader.split(" ")[1]

    if(token==null){
        return res.status(401).json({message:"Authentication token required"});
    }

    //verifying the token
    jwt.verify(token,jwt_secret,(err,user)=>{
        if(err){
            //invalid token or expired -> 403(forbidden)
            return res.status(403).json({message:"Token expires. Please signin again"})
        }

        // Check if username and password are "admin"
        if (user && user.username === "admin" && user.password === "admin") {
            user.role = "admin"; 
        } else {
            user.role = "user"; 
        }
        req.user= user;//attach decoded user info to req obj
        next();//move to next mw or route
    })
}

module.exports={authenticateToken};