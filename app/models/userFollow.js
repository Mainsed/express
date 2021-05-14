import Sequelize from "sequelize";

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
    dialect: "mysql",
    host: "localhost"
});

const UserFollow =  sequelize.define('user_follows', {
    user_id: {
        type: Sequelize.UUID,
    },
    follow_id: {
        type: Sequelize.INTEGER,
    }
});

UserFollow.associate = function(models) {
    UserFollow.belongsTo(models.users, {foreignKey: 'user_id'})
    UserFollow.belongsTo(models.follows, {foreignKey: 'follow_id'})
};

export default UserFollow