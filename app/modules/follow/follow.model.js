import Sequelize from 'sequelize'
import {Follow, Post} from '../../config/dbModels'

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
    dialect: "mysql",
    host: "localhost"
});

function FollowModel() {
    const dbWorker = sequelize.sync();
    return {
        createTableIfDoesntExist: async () => {
            await Follow.sync();
            return this;
        },
        findAll: () => {
            return dbWorker.then(() => Follow.findAll())
        },
        findOne: (user_id, target_id) => {
            return dbWorker.then(() => Follow.findOne({where: {user_id, target_id}}))
        },
        findById: (user_id) => {
            return dbWorker.then(() => Follow.findAll({where: {user_id}}))
        },
        create: (user_id, target_id) => {
            return dbWorker.then(() => Follow.create({
                user_id, target_id, status: 'Pending'
            }))
        },
        setStatus: (user_id, target_id, status) => {
            return dbWorker.then(() => Follow.findOne({where: {user_id, target_id}}))
                .then((follow) => follow.update({status}))
        },
        delete: (user_id, target_id) => {
            return dbWorker.then(() => Follow.destroy({where: {user_id, target_id}}))
        }
    }
}

export default new FollowModel();