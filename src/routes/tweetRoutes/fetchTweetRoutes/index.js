import express from "express";
import fetchAllUsersTweetRoute from "./fetchAllUsersTweetRoute";
import fetchMyTweetRoute from "./fetchMyTweetRoute";

const fetchTweetRoutes = express.Router();
fetchTweetRoutes.use("/my", fetchMyTweetRoute);
fetchTweetRoutes.use("/", fetchAllUsersTweetRoute);
export default fetchTweetRoutes;
