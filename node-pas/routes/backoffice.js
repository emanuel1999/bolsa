const express = require("express");
const router = express.Router();
const { getAllContacts } = require("../controllers/contactoController");
const contactsController = require("../controllers/contactsController");

const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRol } = require("../middlewares/validateRole");

router.get("/contacts", [validarJWT, esAdminRol], contactsController.getAll);

module.exports = router;
