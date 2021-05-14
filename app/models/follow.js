import Sequelize from "sequelize";

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
    dialect: "mysql",
    host: "localhost"
});

const Follow = sequelize.define('follows', {
    user_id: Sequelize.UUID,
    target_id: Sequelize.UUID,
    status: {
        type: Sequelize.STRING,
        values: ['pending', 'accepted', 'rejected']
    }
});

Follow.associate = function(models) {
    Follow.belongsToMany(models.users, {through: 'user_follows', foreignKey: 'follow_id'});
};

export default Follow;