import User from '../../models/user'
import postModel from '../post/post.model'

function UserModel() {
    return {
        findAll: () => {
            return User.findAll()
        },
        findOne: (params) => {
            return User.findOne({where: {...params}})
        },
        create: (name, email, password) => {
            return User.create({
                name,
                email,
                password
            })
        },
        update: (id, updateData) => {
            return User.findOne({where: {id}})
                .then((user) => user.update(updateData))
        },
        delete: async(id) => {
            await postModel.deleteAllPostByUser(id);
            return User.destroy({where: {id}})
        },
    }
}

export default new UserModel();