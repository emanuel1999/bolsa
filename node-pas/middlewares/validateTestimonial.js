const validator=require("express-validator")

const validateTestimonial=[
    validator.check('name')
        .notEmpty().withMessage('debés ingresar un nombre'),
    validator.check('content')
        .notEmpty().withMessage('debés completar un contenido')
]

module.exports=validateTestimonial