const express = require("express");
const {check} = require("express-validator");
const {
  getAllSlide,
  getSlideById,
  createSlide,
  putSlide,
  deleteSlide,
} = require("../controllers/slideController");
const {existeSlidePorID} = require("../helpers/db-validators");
const {validarJWT} = require("../middlewares/validarJWT");
const {validateFields} = require("../middlewares/validateFields");
const {esAdminRol} = require("../middlewares/validateRole");
const router = express.Router();

router.get("/", getAllSlide);
router.get(
  "/:id",
  [check("id").custom(existeSlidePorID), validateFields],
  getSlideById
);
router.post(
  "/",
  [
    validarJWT,
    esAdminRol,
    check("imageUrl", "URL de imagen es requerido"),
    check("imageUrl", "URL de imagen formato no valido").isURL(),
    validateFields,
  ],
  createSlide
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id").custom(existeSlidePorID),
    check("imageUrl", "URL de imagen es requerido"),
    check("imageUrl", "URL de imagen formato no valido").isURL(),
    validateFields,
  ],
  putSlide
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id").custom(existeSlidePorID),
    validateFields,
  ],
  deleteSlide
);
module.exports = router;
