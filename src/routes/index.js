import express from "express";
import userRoutes from "./userRoutes";
import chatRoutes from "./chatRoutes";
import tweetRoutes from "./tweetRoutes";
const routes = express.Router();
routes.use("/user", userRoutes);
routes.use("/message", chatRoutes);
routes.use("/tweet", tweetRoutes);

export default routes;
