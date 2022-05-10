'use strict';
var express = require('express');
var router = express.Router();
var {updateContacto}=require('../controllers/contactoController');
const {updateOrganization,getOrganization}=require('../controllers/organizationController');
const {validateUpdate}=require('../validators/organizationValidator');
const {validateUpdateContacto}=require('../validators/contactoValidator');

router.get('/public',getOrganization);
router.post('/public/:id',validateUpdate,updateOrganization);
router.post('/contacto/:id',validateUpdateContacto,updateContacto);

module.exports= router;