import express from "express";
import Tweet from "../../../models/Tweet";
import { decryptUserEmail } from "../../../utils/decryptUserEmail";
import { sendCustomResponse } from "../../../utils/sendCustomResponse";
const fetchMyTweetRoute = express.Router();
fetchMyTweetRoute.get("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }
    Tweet.find({ author: currentUser })
      .then((tweet) => {
        return sendCustomResponse(
          res,
          200,
          true,
          tweet,
          "My tweets fetched successfully"
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
    console.log(err);
    return sendCustomResponse(
      res,
      400,
      false,
      {},
      "Oops! Something went wrong"
    );
  }
});
export default fetchMyTweetRoute;
