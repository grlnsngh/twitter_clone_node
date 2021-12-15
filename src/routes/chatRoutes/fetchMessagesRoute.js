import express from "express";
import { sendCustomResponse } from "../../utils/sendCustomResponse";
import { decryptUserEmail } from "../../utils/decryptUserEmail";
import User from "../../models/User";
import Conversation from "../../models/Conversation";
import Messages from "../../models/Messages";
const fetchMessagesRoute = express.Router();
fetchMessagesRoute.get("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser || currentUser == req.body.send_to) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }

    User.findOne({ email: req.body.send_to })
      .then((user) => {
        if (!user)
          return sendCustomResponse(
            res,
            404,
            false,
            {},
            "user you are trying fetch does not exist"
          );

        let query = {
          $or: [
            { participants: { $eq: [currentUser, req.body.send_to] } },
            { participants: { $eq: [req.body.send_to, currentUser] } },
          ],
        };
        Conversation.findOne(query)
          .then((conversation) => {
            console.log(conversation);
            Messages.find({ conversation_id: conversation._id })
              .then((messages) => {
                return sendCustomResponse(
                  res,
                  200,
                  true,
                  messages,
                  "Messages fetched successfully"
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
export default fetchMessagesRoute;
