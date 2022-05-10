"use strict";
const {check} = require("express-validator");
const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRol } = require("../middlewares/validateRole");
const {validate} = require("../util/validateHelper");

const validateUpdate = [
  validarJWT,
  esAdminRol,
  check("name").isString().notEmpty(),
  check("image").isString().notEmpty(),
  check("address").isString(),
  check("phone").isNumeric(),
  check("email").isEmail().notEmpty(),
  check("welcomeText").isString().notEmpty(),
  check("aboutUsText").isString(),

  (req, res, next) => validate(req, res, next),
];

module.exports = {validateUpdate};
