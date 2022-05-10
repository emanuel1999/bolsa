const db = require("../models");
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = [
  check("email").isEmail().withMessage("Invalid email"),

  body("email").custom(async function (value) {
    return await db.User.findOne({
      where: {
        email: value,
      },
    }).then((user) => {
      if (!user) {
        return Promise.reject("Email not registered");
      }
    });
  }),
];
