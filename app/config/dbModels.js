import Sequelize from "sequelize";

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
    dialect: "mysql",
    host: "localhost"
});

export const User = sequelize.define('user', {
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

export const Post = sequelize.define('post', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    text: Sequelize.STRING,
    creator_id: Sequelize.STRING
});

export const Follow = sequelize.define('follow', {
    user_id: Sequelize.UUID,
    target_id: Sequelize.UUID,
    status: Sequelize.STRING
});