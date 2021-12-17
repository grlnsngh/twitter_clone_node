import bcrypt from "bcryptjs";
import express from "express";
import User from "../../models/User";
import { sendCustomResponse } from "../../utils/sendCustomResponse";

const signupRoute = express.Router();

signupRoute.post("/", (req, res) => {
  try {
    // validation
    let errors = [];

    if (req.body.password != req.body.password2) {
      errors.push({ text: "Password do not match" });
    }
    if (req.body.password.length < 4) {
      errors.push({ text: "Password must be atleast 4 characters" });
    }
    if (errors.length > 0) {
      return sendCustomResponse(res, 400, false, {}, errors);
    } else {
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (user)
            return sendCustomResponse(
              res,
              400,
              false,
              {},
              "This email is already present"
            );
          else {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                // Store hash in your password DB.
                newUser.password = hash;
                console.log(newUser);
                newUser
                  .save()
                  .then((user) => {
                    return sendCustomResponse(
                      res,
                      200,
                      true,
                      {},
                      "Signed up successful, sign in to continue"
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
              });
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
    }
  } catch (err) {
    return sendCustomResponse(
      res,
      400,
      false,
      {},
      "Please put name, email, password and password2 as key"
    );
  }
});

export default signupRoute;
