'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Organizations', [{
        name: 'Emanuel Rivero',
        image: 'otoño.png',
        address: 'Juan 23',
        phone: '081022',
        email: 'Test@test.com',
        welcomeText: 'Welcome',
        aboutUsText: 'bye',
        createdAt: new Date,
        updatedAt: new Date
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

   // await queryInterface.bulkDelete('Organization', null, {});  
  }
};
