"use strict";
const repository = require("../repositories/organizationRepository");

exports.getOrganization = async (req, res) => {
  const organization = await repository.getDataOrganization();
  if (!organization) {
    res.status(400).json({message: "error get organization"});
  } else {
    res.status(200).json(organization);
  }
};

exports.updateOrganization = async (req, res) => {
  const id = req.params.id;
  const updateOrga = repository.updateOrganization(req.body, id);
  if (!updateOrga) {
    res.status(400).json({message: "error updating organization"});
  } else {
    res.status(200).json("UPDATE");
  }
};
