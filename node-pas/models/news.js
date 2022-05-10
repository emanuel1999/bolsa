"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.Categories, {
        as: "Category",
        foreignKey: "categoryId",
      });
    }
  }
  News.init(
    {
      name: {
        type: DataTypes.STRING(50),
        validate: {
          notEmpty: true,
          notNull: true,
        },
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "News",
    }
  );
  return News;
};
