"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      Organization.belongsTo(models.Contacto, {
        as: "contacto",
        foreignKey: "contactoId",
      });
      Organization.hasMany(models.Slide, {
        as: "slides",
      });
    }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      contactoId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      welcomeText: DataTypes.TEXT,
      aboutUsText: DataTypes.TEXT,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Organization",
      paranoid: true,
    }
  );
  return Organization;
};
