'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {    
     
    await queryInterface.bulkInsert('Activities', [{
        name: 'actividad',
        content: 'Contenido asdsadasdasds',
        image: 'urlimagen',       
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'asdasd',
        content: 'Contenido ffffff',
        image: 'urlimagensdasdas',       
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'activity',
        content: 'Content asdsadasdasds',
        image: 'urlimage',       
        createdAt: new Date,
        updatedAt: new Date
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Activities', null, {});
     
  }
};