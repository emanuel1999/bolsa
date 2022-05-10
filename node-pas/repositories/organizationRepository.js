"use strict";
const db = require("../models");

const getDataOrganization = async () => {
  const data = await db.Organization.findAll({
    attributes: ["name", "image", "phone", "address"],
    include: [
      {
        model: db.Contacto,
        as: "contacto",
        attributes: ["facebook", "instagram", "linkedin"],
      },
      {
        model: db.Slide,
        as: "slides",
        attributes: ["imageUrl", "order", "text"],
        order: ["order", "DESC"],
      },
    ],
  });
  return data;
};

const updateOrganization = async (data, id) => {
  const updateData = await db.Organization.update(
    {
      name: data.name,
      image: data.image,
      address: data.address,
      phone: data.phone,
      email: data.email,
      welcomeText: data.welcomeText,
      aboutUsText: data.aboutUsText,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return updateData;
};

module.exports = {
  getDataOrganization,
  updateOrganization,
};
