import express from "express";
import Tweet from "../../models/Tweet";
import { decryptUserEmail } from "../../utils/decryptUserEmail";
import { sendCustomResponse } from "../../utils/sendCustomResponse";

const updateTweetRoute = express.Router();
updateTweetRoute.patch("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }

    if (req.body.new_tweet.trim() == "")
      return sendCustomResponse(
        res,
        400,
        false,
        {},
        "Error! Tweet can not be empty"
      );

    const newTweet = {
      body: req.body.new_tweet,
      last_edited: new Date(),
    };

    Tweet.findOne({ _id: req.body.tweet_id })
      .then((tweet) => {
        if (!tweet)
          return sendCustomResponse(
            res,
            404,
            false,
            {},
            "Can not find this tweet_id"
          );

        Tweet.findOneAndUpdate(
          { _id: req.body.tweet_id },
          { $set: { body: newTweet.body, last_edited: newTweet.last_edited } }
        )
          .then((tweet) => {
            return sendCustomResponse(
              res,
              200,
              true,
              newTweet,
              "Tweet updated successfully"
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
      "Please pass JSON object in body with tweet_id,new_tweet as key and id,string as value"
    );
  }
});
export default updateTweetRoute;
