const validator = require("express-validator");
const {validateFields} = require("./validateFields");
const db = require("../models");

const existActivityById = async (id) => {
  const existActivity = await db.Activity.findOne({
    where: {
      id,
    },
  });
  if (!existActivity) {
    throw new Error(`The activity whit the ID: ${id} does not exist`);
  }
};

const validateActivitiesFields = [
  validator.check("name", "Name is required").notEmpty(),
  validator.check("content", "Empty content value").notEmpty(),
  validator.check("id").custom(existActivityById),
  validateFields,
];

const validateActivitiesCreate = [
  validator.check("name", "Name is required").notEmpty(),
  validator.check("content", "Empty content value").notEmpty(),
  validateFields,
];

module.exports = {validateActivitiesFields, validateActivitiesCreate};
