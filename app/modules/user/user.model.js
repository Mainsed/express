import User from '../../models/user'

function UserModel() {
    return {
        findAll: () => {
            return User.findAll()
        },
        findOne: (id) => {
            return User.findOne({where: {id}})
        },
        create: (name, email) => {
            return User.create({
                name,
                email
            })
        },
        update: async (id, updateData) => {
            return User.findOne({where: {id}})
                .then((user) => user.update(updateData))
        },
        delete: (id) => {
            return User.destroy({where: {id}})
        },
    }
}

export default new UserModel();