const jwt = require("jsonwebtoken");
const User = require("../model/authUserModel");

const protectedRoutes= async (req, res, next)=>{
    try{
        const token =req.cookies.jwt;
        // console.log(token)
        
        if(!token){
       return res.status(401).json({error: `No token is found!`})
        }
        const verifyUser = jwt.verify(token, process.env.SECRETKEY) 
// console.log(verifyUser, "decode")
        if(!verifyUser){
            return res.status(400).json({error: `Invalid token is  found!`})
        }
        const user =await User.findById(verifyUser.userId).select("-password")
        // console.log(user, "üser")
        if(user){
            req.user = user;
            next();
            // return res.status(200).json({message: `${user.fullName} is verified!`})
        }else{
            return res.status(404).json({err: `User not found!`})
            
        }
       
    }catch(err){
        res.status(500).json({error: `Internal Server Error: ${err.message}`})
    }

}

module.exports=protectedRoutes;