'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('follows', [{
      user_id: 'ewf9v6vkkon7j4qkn',
      target_id: 'ewf9v6vgkon7j4qkn',
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('follows', null, {});
  }
};
