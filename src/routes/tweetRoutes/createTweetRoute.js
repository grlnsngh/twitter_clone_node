import express from "express";
import { sendCustomResponse } from "../../utils/sendCustomResponse";
import { decryptUserEmail } from "../../utils/decryptUserEmail";
import Tweet from "../../models/Tweet";
const createTweetRoute = express.Router();
createTweetRoute.post("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }

    if (req.body.tweet.trim() == "")
      return sendCustomResponse(
        res,
        400,
        false,
        {},
        "Error! Tweet can not be empty"
      );

    const newTweet = new Tweet({
      author: currentUser,
      body: req.body.tweet,
    });
    newTweet
      .save()
      .then((tweet) => {
        return sendCustomResponse(
          res,
          200,
          true,
          newTweet,
          "Tweet posted successfully"
        );
      })
      .catch((err) => {
        console.log(err);
        return sendCustomResponse(
          res,
          400,
          false,
          {},
          "Oops! Something went wrong"
        );
      });
  } catch (err) {
    return sendCustomResponse(
      res,
      400,
      false,
      {},
      "Please pass JSON object in body with tweet as key and string as value"
    );
  }
});
export default createTweetRoute;
