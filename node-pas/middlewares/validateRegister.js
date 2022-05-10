const {check} = require("express-validator");
const db = require("../models");
const {validateFields} = require("./validateFields");

const esEmailExistente = async (email = "") => {
  const existeEmail = await db.User.findOne({
    where: {
      email,
    },
  });
  if (existeEmail) {
    throw new Error(`This email: ${email} is already registered`);
  }
};

const validateRegister = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty().isEmail(),
  check("email", "This field must be an email").isEmail(),
  check("email").custom(esEmailExistente),
  check("password", "Password is required").not().isEmpty(),
  validateFields,
];

module.exports = {validateRegister};
