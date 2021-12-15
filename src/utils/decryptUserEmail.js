import jwt from "jsonwebtoken";
export const decryptUserEmail = (req) => {
  // check if token is empty
  if (typeof req.headers.authorization === "undefined") {
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const userInfo = jwt.decode(token);
  // check for valid token
  if (userInfo === null) return;
  return userInfo.email;
};
