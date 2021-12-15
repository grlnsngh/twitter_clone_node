import express from "express";
import { sendCustomResponse } from "../../utils/sendCustomResponse";
import { decryptUserEmail } from "../../utils/decryptUserEmail";
import User from "../../models/User";
import Conversation from "../../models/Conversation";
import Messages from "../../models/Messages";
import Tweet from "../../models/Tweet";
const deleteTweetRoute = express.Router();
deleteTweetRoute.delete("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }

    Tweet.findOneAndDelete({ _id: req.body.tweet_id })
      .then((tweet) => {
        return sendCustomResponse(
          res,
          200,
          true,
          {},
          "Tweet deleted successfully"
        );
      })
      .catch((err) => {
        return sendCustomResponse(
          res,
          400,
          false,
          {},
          "Please put valid tweet_id"
        );
      });
  } catch (err) {
    return sendCustomResponse(
      res,
      400,
      false,
      {},
      "Please pass JSON object in body with tweet_id and id as value"
    );
  }
});
export default deleteTweetRoute;
