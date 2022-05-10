'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Role.init({

    id: {
      type: DataTypes.INTEGER,   
      primaryKey: true,//tuve que agregar esta propiedad para hacer correr el proyecto
      allowNull: false,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    //Modificado Type de createdAt y deletedAt
    createdAt: {

    //tuve que cambiar el valor de la propiedad type para que el proyecto corra  
      type: DataTypes.DATE,
    },
    updatedAt: {
    //tuve que cambiar el valor de la propiedad type para que el proyecto corra
      type: DataTypes.DATE,

    } 
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};