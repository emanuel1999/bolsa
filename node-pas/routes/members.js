const express = require("express");
const {check} = require("express-validator");
const router = express.Router();

const { getMembers, updateMember,createMembers, deleteMember } = require("../controllers/memberController");
const { pagination } = require("../middlewares/paginationMiddleware_p1");

const {validarJWT} = require("../middlewares/validarJWT");
const {validateFields} = require("../middlewares/validateFields");
const {esAdminRol} = require("../middlewares/validateRole");

router.get("/", getMembers);
router.post(
  "/",
  [
    validarJWT,
    esAdminRol,
    check("name").isString().not().isEmpty(),
    check("image", "image is require").not().isEmpty(),
    validateFields,
  ],
  createMembers
);
router.get("/", pagination, getMembers);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
