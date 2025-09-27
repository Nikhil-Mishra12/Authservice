'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Roles', [
    {
        name: 'ADMIN',
        createdAT:new Date(),
        updatedAt:new Date()
     },
     {
      name:'CUSTOMER',
      createdAT:new Date(),
        updatedAt:new Date()
     },
     {
      name:'AIRLINEBUSINESS',
      createdAT:new Date(),
        updatedAt:new Date()
     }
     
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
