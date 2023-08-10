import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/keys.js";
import userModel from "../models/users.js";

const loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    token = token.replace("Bearer ", "");
    let decode = jwt.verify(token, JWT_SECRET); // Add the 'let' keyword here
    req.userDetails = decode;
    next();
  } catch (err) {
    res.json({
      error: "You must be logged in",
    });
  }
};

const isAuth = (req, res, next) => {
  let {loggedInUserId} = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    res.status(403).json({error: "You are not authenticate"});
  }
  next();
};

const isAdmin = async (req, res, next) => {
  try {
    const reqUser = await userModel.findById(req.body.loggedInUserId);
    // If user not found or role is 0, that means they are not an admin
    if (!reqUser || reqUser.userRole === 0) {
      return res.status(403).json({error: "Access denied"});
    }
    next();
  } catch {
    res.status(404);
  }
};
export {loginCheck, isAuth, isAdmin};
