import Sequelize from 'sequelize'
import {User} from '../../config/dbModels'

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
    dialect: "mysql",
    host: "localhost"
});

function UserModel () {
    const dbWorker = sequelize.sync();
    return {
        createTableIfDoesntExist: async () => {
            await User.sync();
            return this;
        },
        findAll: () => {
            return dbWorker.then(() => User.findAll())
        },
        findOne: (id) => {
            return dbWorker.then(() => User.findOne({where: {id}}))
        },
        create: (name, email) => {
            return dbWorker.then(() => User.create({
                name,
                email
            }))
        },
        update: async (id, updateData) => {
            return dbWorker.then(() => User.findOne({where: {id}}))
                .then((user)=>user.update(updateData))
        },
        delete: (id) => {
            return dbWorker.then(() => User.destroy({where: {id}}))//working
        }
    }
}

export default new UserModel();