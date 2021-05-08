import Sequelize from 'sequelize'
import {Post} from '../../config/dbModels'

const sequelize = new Sequelize("chisw_homework", "root", "balu2000", {
    dialect: "mysql",
    host: "localhost"
});

function PostModel () {
    const dbWorker = sequelize.sync();
    return {
        createTableIfDoesntExist: async () => {
            await Post.sync();
            return this;
        },
        findAll: () => {
            return dbWorker.then(() => Post.findAll())
        },
        findOne: (id) => {
            return dbWorker.then(() => Post.findOne({where: {id}}))
        },
        create: (text, creator_id) => {
            return dbWorker.then(() => Post.create({
                text,
                creator_id
            }))
        },
        update: async (id, updateData) => {
            return dbWorker.then(() => Post.findOne({where: {id}}))
                .then((post)=>post.update(updateData))
        },
        delete: (id) => {
            return dbWorker.then(() => Post.destroy({where: {id}}))//working
        }
    }
}

export default new PostModel();