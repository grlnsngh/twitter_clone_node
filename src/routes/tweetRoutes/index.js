import express from "express";
import createTweetRoute from "./createTweetRoute";
import fetchTweetRoutes from "./fetchTweetRoutes";
import updateTweetRoute from "./updateTweetRoute";
import deleteTweetRoute from "./deleteTweetRoute";
import likeTweetRoute from "./likeTweetRoute";
import unlikeTweetRoute from "./unlikeTweetRoute";

const tweetRoutes = express.Router();
tweetRoutes.use("/create", createTweetRoute);
tweetRoutes.use("/fetch", fetchTweetRoutes);
tweetRoutes.use("/update", updateTweetRoute);
tweetRoutes.use("/delete", deleteTweetRoute);
tweetRoutes.use("/like", likeTweetRoute);
tweetRoutes.use("/unlike", unlikeTweetRoute);
export default tweetRoutes;
