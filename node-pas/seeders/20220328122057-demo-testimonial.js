'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('testimonials', [{
      name: 'Facundo',
      image: 'ejemplo.jpg',
      content:'demo' ,
      createdAt: new Date,
      updatedAt: new Date,
      deletedAt: null
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
