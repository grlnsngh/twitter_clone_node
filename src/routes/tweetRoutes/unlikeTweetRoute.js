import express from "express";
import Likes from "../../models/Likes";
import Tweet from "../../models/Tweet";
import { decryptUserEmail } from "../../utils/decryptUserEmail";
import { sendCustomResponse } from "../../utils/sendCustomResponse";
const unlikeTweetRoute = express.Router();

unlikeTweetRoute.delete("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }
    Tweet.findOne({ _id: req.body.tweet_id })
      .then((tweet) => {
        if (!tweet)
          return sendCustomResponse(res, 400, false, {}, "Tweet not found");

        // check if already liked
        let query = {
          $and: [{ tweet_id: req.body.tweet_id }, { liked_by: currentUser }],
        };
        Likes.findOne(query).then((like) => {
          console.log(like);
          //   already liked
          //   so unlike it
          if (like) {
            Likes.findOneAndDelete(query)
              .then((like) => {
                //increase likes count
                Tweet.findOneAndUpdate(
                  { _id: req.body.tweet_id },
                  { $inc: { likes_count: -1 } }
                )
                  .then((tweet) => {
                    return sendCustomResponse(
                      res,
                      200,
                      true,
                      like,
                      "Unliked tweet successfully"
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
          } else {
            //not liked, already unliked
            return sendCustomResponse(
              res,
              400,
              false,
              {},
              "Oops! Already unliked."
            );
          }
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
      "Please pass JSON object in body with tweet_id as key and id as value"
    );
  }
});
export default unlikeTweetRoute;
