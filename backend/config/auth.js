import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({
  path:"../config/.env"
})


export const isAuthenticated = async (req,res,next) =>{
  try{
    const token = req.cookies.token;
    console.log(token)
    if(!token){
      return res.status(401).json({
      message:"User Not Authenticated.",
      success:false
      })
    }
    const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decode);
    res.user = decode.id;
    next();
  }catch(error){
    if (error.message.includes('jwt expired')) {
      return res.status(401).json({
        message: "Token has expired. Please log in again.",
        success: false
      });
    }
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
}

