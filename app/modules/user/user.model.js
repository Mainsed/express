import User from '../../models/user'

function UserModel() {
    return {
        findAll: () => {
            return User.findAll()
        },
        findOne: (params) => {
            console.log('params', params)
            return User.findOne({where: {...params}})
        },
        create: (name, email, password) => {
            return User.create({
                name,
                email,
                password
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