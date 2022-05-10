const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const {validarJWT} = require("../middlewares/validarJWT");

router.get("/me", [validarJWT], usersController.me);

module.exports = router;
