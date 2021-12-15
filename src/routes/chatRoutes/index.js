import express from "express";
import fetchMessagesRoute from "./fetchMessagesRoute";
import sendMessageRoute from "./sendMessageRoute";
const chatRoutes = express.Router();
chatRoutes.use("/fetch", fetchMessagesRoute);
chatRoutes.use("/send", sendMessageRoute);
export default chatRoutes;
