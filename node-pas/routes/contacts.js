const express = require("express");
const router = express.Router();
//const { getAllContacts } = require("../controllers/contactoController");
const contactsController = require("../controllers/contactsController");
const {validateCreateContacto} = require("../validators/contactoValidator");

const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRol } = require("../middlewares/validateRole");

router.get("/", [validarJWT, esAdminRol], contactsController.getAll);
router.post("/", validateCreateContacto, contactsController.store);

module.exports = router;
