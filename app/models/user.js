import Sequelize from "sequelize";

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
    dialect: "mysql",
    host: "localhost"
});

const User =  sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {isEmail: true}
    },
});

User.associate = function(models) {
    User.hasMany(models.posts, {foreignKey: 'creator', as: 'id'})
    User.belongsToMany(models.follows, {through: 'user_follows', foreignKey: 'user_id'})
};

export default User