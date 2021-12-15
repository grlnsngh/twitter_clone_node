import express from "express";
import { sendCustomResponse } from "../../utils/sendCustomResponse";
import { decryptUserEmail } from "../../utils/decryptUserEmail";
import User from "../../models/User";
import Conversation from "../../models/Conversation";
import Messages from "../../models/Messages";
const sendMessageRoute = express.Router();

sendMessageRoute.post("/", (req, res) => {
  try {
    const currentUser = decryptUserEmail(req);
    //check for valid user
    if (!currentUser) {
      return sendCustomResponse(res, 401, false, {}, "Unauthorized");
    }
    // check if person can not send message to self
    if (currentUser == req.body.send_to) {
      return sendCustomResponse(
        res,
        400,
        false,
        {},
        "Can not sent message to yourself"
      );
    }
    User.findOne({ email: req.body.send_to })
      .then((user) => {
        if (!user)
          return sendCustomResponse(
            res,
            404,
            false,
            {},
            "You are trying to send message to user who does not exist"
          );

        let query = {
          $or: [
            { participants: { $eq: [currentUser, req.body.send_to] } },
            { participants: { $eq: [req.body.send_to, currentUser] } },
          ],
        };

        Conversation.findOne(query)
          .then((conversation) => {
            //check if its the first time current user is sending message,
            //if yes then start new conversation and save messages under it
            if (!conversation) {
              let ObjectID = require("mongodb").ObjectID;
              let objectId = new ObjectID();
              const newConversation = new Conversation({
                participants: [currentUser, req.body.send_to],
                _id: objectId,
              });
              newConversation
                .save()
                .then(() => {
                  const newMessage = new Messages({
                    sender: currentUser,
                    message: req.body.message,
                    conversation_id: objectId,
                  });
                  newMessage
                    .save()
                    .then(() => {
                      return sendCustomResponse(
                        res,
                        200,
                        true,
                        {},
                        "Message sent successfully"
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
              // push messages to Messages collection with respective conversation id
              const newMessage = new Messages({
                sender: currentUser,
                message: req.body.message,
                conversation_id: conversation._id,
              });
              newMessage
                .save()
                .then(() => {
                  return sendCustomResponse(
                    res,
                    200,
                    true,
                    {},
                    "Message sent successfully"
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
            }
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
export default sendMessageRoute;
