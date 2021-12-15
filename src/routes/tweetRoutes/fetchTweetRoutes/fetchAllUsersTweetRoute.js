import express from "express";
import { decryptUserEmail } from "../../../utils/decryptUserEmail";
import { sendCustomResponse } from "../../../utils/sendCustomResponse";
import Tweet from "../../../models/Tweet";
const fetchAllUsersTweetRoute = express.Router();
fetchAllUsersTweetRoute.get("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }
    Tweet.find()
      .then((tweet) => {
        return sendCustomResponse(
          res,
          200,
          true,
          tweet,
          "All tweets fetched successfully"
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
export default fetchAllUsersTweetRoute;
