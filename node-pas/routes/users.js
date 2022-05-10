const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUserById,
  deleteUserById,
  update,
} = require("../controllers/usersController");
const {validarJWT} = require("../middlewares/validarJWT");
const {esAdminRol} = require("../middlewares/validateRole");

router.get("/", [validarJWT, esAdminRol], getAllUser);
router.get("/:id", getUserById);
router.delete("/:id", [validarJWT, esAdminRol], deleteUserById);
router.patch("/:id", [validarJWT], update);

module.exports = router;
