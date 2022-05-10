const db = require("../models");
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers/generarJWT");

const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    //1 Verificar si el email existe
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({
        msg: "Credenciales no validas!!!-El correo no pertenece a un usuario del sistema",
      });
    }
    //2 TODO verificar si el usuario esta activo

    //3 verificar la contraseña
    const validarPassword = bcryptjs.compareSync(password, user.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Credenciales no validas!! - password incorrecto",
      });
    }

    //4 generar JWT
    const token = await generarJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal!",
    });
  }
};

module.exports = {login};
