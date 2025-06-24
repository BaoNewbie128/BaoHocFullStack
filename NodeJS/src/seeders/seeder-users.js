'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'tieubaobao305@gmail.com',
        password: '123456',
        firstName: 'Bao',
        lastName: 'Vong',
        address: 'Dong Nai',
        phonenumber: '0522542373',
        gender: 1,
        image: 'doctor',
        roleID: '1',
        positionID: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
