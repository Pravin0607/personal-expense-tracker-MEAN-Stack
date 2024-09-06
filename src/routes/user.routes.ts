import {Router } from "express";
import { authenticateUser, registerUser, deleteUser, updateUser, getUserDetails } from "../controllers/user.controller";
import { auth } from "../middleware/auth";

const userRouter=Router();

// userRouter.get('/',);

userRouter.post('/login',authenticateUser);

userRouter.post('/register',registerUser);

userRouter.use(auth);

userRouter.get('/',getUserDetails);
// incomplete routes
userRouter.delete('/delete',deleteUser)

userRouter.patch('/update',updateUser);


export {userRouter};