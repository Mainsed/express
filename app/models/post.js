import Sequelize from "sequelize";

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
  dialect: "mysql",
  host: "localhost"
});

export default sequelize.define('posts', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  text: Sequelize.STRING,
  creator: Sequelize.STRING
});