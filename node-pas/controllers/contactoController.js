"use strict";
const repository = require("../repositories/contactoRepository");
const db = require("../models");
const { sendNewContactEmail } = require("../services/emails");

exports.updateContacto = async (req, res) => {
  const id = req.params.id;
  const updateContacto = repository.updateContacto(req.body, id);
  if (!updateContacto) {
    res.status(400).json({ message: "error updating organization" });
  } else {
    //aca enviar email
    //console.log(req.body.email);
    //sendNewContactEmail(updateContacto.email, updateContacto.id);
    res.status(200).json("UPDATE");
  }
};

exports.getAllContacts = async (req, res) => {
  try{
    const contacts = await db.Contacto.findAll();
    res.status(200).json(contacts);
  } catch(err){
    res.status(400).json({message: "error getting contacts"});
  }
};