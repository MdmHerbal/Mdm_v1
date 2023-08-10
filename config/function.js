// /* This all of are helper function */
// const userModel = require("../models/users");

// exports.toTitleCase = function (str) {
//   return str.replace(/\w\S*/g, function (txt) {
//     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//   });
// };

// exports.validateEmail = function (mail) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// exports.emailCheckInDatabase = async function (email) {
//   let user = await userModel.findOne({ email: email });
//   user.exec((err, data) => {
//     if (!data) {
//       return false;
//     } else {
//       return true;
//     }
//   });
// };

// exports.phoneNumberCheckInDatabase = async function (phoneNumber) {
//   let user = await userModel.findOne({ phoneNumber: phoneNumber });
//   user.exec((err, data) => {
//     if (data) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// };

import userModel from "../models/users.js";

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    return false;
  }
}

export async function emailCheckInDatabase(email) {
  let user = await userModel.findOne({email: email});
  return !!user;
}

export async function phoneNumberCheckInDatabase(phoneNumber) {
  let user = await userModel.findOne({phoneNumber: phoneNumber});
  return !!user;
}
