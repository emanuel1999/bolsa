const { check } = require('express-validator');
const { validate } = require('../util/validateHelper');


const validateCreate = [
    check('name').trim().not().isEmpty().withMessage("Field name is required"),
    check('content').trim().not().isEmpty().withMessage("Field content is required"),
    check('image').trim().not().isEmpty().withMessage("Field image is required"),
    check('categoryId').trim().not().isEmpty().withMessage("Field categoryId is required").isNumeric().withMessage("Field categoryId must be a number"),
    (req, res, next) => validate(req, res, next)
]

module.exports = { validateCreate }