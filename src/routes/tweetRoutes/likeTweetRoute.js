import express from "express";
import Likes from "../../models/Likes";
import Tweet from "../../models/Tweet";
import { decryptUserEmail } from "../../utils/decryptUserEmail";
import { sendCustomResponse } from "../../utils/sendCustomResponse";
const likeTweetRoute = express.Router();

likeTweetRoute.patch("/", (req, res) => {
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
          //not liked
          if (!like) {
            const newLike = new Likes({
              liked_by: currentUser,
              tweet_id: req.body.tweet_id,
            });
            newLike
              .save()
              .then((like) => {
                //increase likes count
                Tweet.findOneAndUpdate(
                  { _id: req.body.tweet_id },
                  { $inc: { likes_count: 1 } }
                )
                  .then((tweet) => {
                    return sendCustomResponse(
                      res,
                      200,
                      true,
                      like,
                      "Liked tweet successfully"
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
            return sendCustomResponse(
              res,
              400,
              false,
              {},
              "Oops! Already liked."
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
export default likeTweetRoute;
