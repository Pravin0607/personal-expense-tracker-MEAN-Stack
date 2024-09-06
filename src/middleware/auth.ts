import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  //the token is stored in the headers token property
  const token = req.header("token");
  // console.log("token is",token)
  if (!token) {
    return res.status(401).json({success:false, message: "Access Denied"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById((decoded as any)._id);
    if(user)
    {
      req.headers.userId = user._id;
    }
    else{
      console.log("user not found")
      return res.status(400).json({success:false, message: "Invalid Token"})      
    }
    next();
  }catch(err){
    console.log(err);
    res.status(400).json({success:false, message: "Invalid Token"})
  }
};


export {auth};



//i want to call the auth 