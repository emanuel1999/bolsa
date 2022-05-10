'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', [{
      name: 'Category 1',
      description: "description category 1",
      image: "image category 1",
      createdAt: new Date,
      updatedAt: new Date
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
