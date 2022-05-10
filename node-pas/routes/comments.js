const express=require("express")
const router=express.Router()
const {validarJWT}=require("../middlewares/validarJWT");
const {esAdminRol}=require("../middlewares/validateRole")
const {getCommentsList,updateComment, deleteOne, postComment}=require("../controllers/commentsController");
const { userIsOwnerOrAdmin } = require("../middlewares/validateCommentUser");

router.get("/",validarJWT, getCommentsList)

router.post("/", validarJWT, postComment)

router.delete("/:id", validarJWT, userIsOwnerOrAdmin, deleteOne)

router.put("/:id", validarJWT, userIsOwnerOrAdmin, updateComment)

module.exports=router