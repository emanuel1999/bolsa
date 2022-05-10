const {Router} = require("express");
const {postUser} = require("../controllers/registerController");
const {validateRegister} = require("../middlewares/validateRegister");
const router = Router();

router.post("/", validateRegister, postUser);
module.exports = router;
