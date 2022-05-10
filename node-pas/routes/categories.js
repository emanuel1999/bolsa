const { getCategoriesList, createCategory, getCategoryDetail, updateCategory, deleteCategory } = require('../controllers/categoriesController');
const express = require('express');
const router = express.Router();
const { validateCreate, validateUpdate } = require('../validators/categoriesValidator');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRol } = require('../middlewares/validateRole')



router.get('/',validarJWT, esAdminRol, getCategoriesList);
router.get('/:id',validarJWT, esAdminRol, getCategoryDetail);
router.post('/',validarJWT, esAdminRol, validateCreate, createCategory);
router.put('/:id', validarJWT, esAdminRol, validateUpdate, updateCategory);
router.delete('/:id', validarJWT, esAdminRol, deleteCategory);





module.exports = router;