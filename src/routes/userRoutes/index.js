import express from "express";
import signinRoute from "./singinRoute";
import signupRoute from "./signupRoute";

const userRoutes = express.Router();
userRoutes.use("/signin", signinRoute);
userRoutes.use("/signup", signupRoute);

export default userRoutes;
