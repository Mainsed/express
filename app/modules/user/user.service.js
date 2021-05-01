import model from './user.model'

function UserService() {
    return {
        findAll: function () {
            return model.findAll();
        },
        findOne: async function (id) {
            const user = await model.findOne(id);
            if(!user) throw new Error("User doesn't exist");
            return user;
        },
        create: function (name) {
            return model.create(name);
        },
        update: async function (id, updateData) {
            const user = await this.findOne(id);
            if(!user) throw new Error("User doesn't exist");
            return model.update(id, updateData);
        },
        delete: function (id) {
            return model.delete(id);
        }
    }
}

export default new UserService();