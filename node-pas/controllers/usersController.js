const db = require("../models");
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers/generarJWT");
const {validarJWT} = require("../middlewares/validarJWT");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  const users = await db.User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "image", "roleId"],
  });
  res.status(400).json({users});
};

const getUserById = async (req, res) => {
  const {id} = req.params;
  const user = await db.User.findByPk(id, {
    attributes: ["id", "firstName", "lastName", "email", "image", "roleId"],
  });
  res.status(400).json({user});
};

const deleteUserById = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({msg: "User not found"});
    }
    await user.destroy();
    return res.status(200).json({msg: "User deleted"});
  } catch {
    return res.status(500).json({msg: "Error deleting user"});
  }
};

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

const me = async (req, res) => {
  const {userAuth} = req;
  res.json({
    userAuth,
  });
};

const update = async (req, res) => {
  const id = req.params.id;
  const {firstName, lastName, image, email} = req.body;

  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    const userToUpdate = await db.User.update(
      {
        firstName,
        lastName,
        image,
        email,
      },
      {
        where: {id},
      }
    );

    return res.status(200).json({
      message: "User updated successfully",
      user: await db.User.findByPk(id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
      }),
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {getAllUser, getUserById, me, update, deleteUserById};

/* 
const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const jwt = require('jsonwebtoken')
const { User } = require('../models/index');

const usersController = {
  login: async function (req, res) {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      await userService.postLogin(req, res);
    } else {
      return res.status(400).json(errors);
      console.log(errors);
    }
  },
};

module.exports = usersController; */
