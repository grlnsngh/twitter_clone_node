import express from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendCustomResponse } from "../../utils/sendCustomResponse";

const signinRoute = express.Router();

signinRoute.post("/", (req, res) => {
  try {
    if (req.body.password.length < 4) {
      return sendCustomResponse(
        res,
        400,
        false,
        {},
        "Password must be atleast 4 characters long"
      );
    }

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          // if email is correct, check for password
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              return sendCustomResponse(
                res,
                400,
                false,
                {},
                "Either email or password is incorrect"
              );
            }
            // auth success, generate token
            if (result) {
              const token = jwt.sign(
                { email: user.email, _id: user._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
              );
              return sendCustomResponse(
                res,
                200,
                true,
                token,
                "Login Successful"
              );
            }
            // password fails to match
            return sendCustomResponse(
              res,
              400,
              false,
              {},
              "Either email or password is incorrect"
            );
          });
        } else {
          // email not present in db
          return sendCustomResponse(
            res,
            400,
            false,
            {},
            "Either email or password is incorrect"
          );
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
  } catch (err) {
    return sendCustomResponse(
      res,
      400,
      false,
      {},
      "Please put email and password as JSON body"
    );
  }
});

export default signinRoute;
