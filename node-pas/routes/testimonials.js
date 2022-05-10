const express=require("express")
const router=express.Router()
const {validarJWT}=require("../middlewares/validarJWT")
const {esAdminRol}=require("../middlewares/validateRole")
const testimonialsControler=require("../controllers/testimonialsController")
const validateTestimonial=require("../middlewares/validateTestimonial")
router.get("/",testimonialsControler.list)
router.post("/",validarJWT,esAdminRol,validateTestimonial,testimonialsControler.create)
router.put("/:id",validarJWT,esAdminRol,validateTestimonial,testimonialsControler.update)
router.delete("/:id",validarJWT,esAdminRol,testimonialsControler.destroy)

module.exports=router