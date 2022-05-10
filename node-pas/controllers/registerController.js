const db = require("../models");
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers/generarJWT");
const emailsController = require("../services/emails")

const postUser = async (req, res) => {
  try {
    const {firstName, lastName, email, image, password, roleId} = req.body;
    const user = new db.User({
      firstName,
      lastName,
      email,
      image,
      password,
      roleId,
    });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    // TODO enviar email de registro

    console.log(user.id);
    const token = await generarJWT(user.id);

    res.json({
      msg: "Usuario Creado con exito!",
      user,
      token,
    });
    emailsController.sendWelcomeEmail(email) // funcion que envia el email de bienvenida
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {postUser};
