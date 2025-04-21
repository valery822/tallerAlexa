'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nombre: "vale",
          correo: "vale12@gmail.com",
          contrasena: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "valery",
          correo: "valen23@gmail.com",
          contrasena: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
