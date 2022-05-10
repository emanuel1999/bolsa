const { check } = require('express-validator');
const { validate } = require('../util/validateHelper');


const validateCreate = [
    check('name', 'name is required').exists().isString().not().isEmpty(),
    check('description').isString(),
    check('image').isString(),
    (req, res, next) => validate(req, res, next)
]

const validateUpdate = [
    check('name').isString(),
    check('description').isString(),
    check('image').isString(),
    (req, res, next) => validate(req, res, next)
]

module.exports = { validateCreate, validateUpdate };