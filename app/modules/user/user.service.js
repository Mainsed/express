import model from './user.model'

function UserService() {
    return {
        findAll: async function () {
            return model.findAll();
        },
        findOne: async function (id) {
            const user = await model.findOne(id);
            if(!user) throw new Error("User doesn't exist");
            return user;
        },
        create: async function (name) {
            return model.create(name);
        },
        update: async function (id, updateData) {
            if(!id) throw new Error('No id contained');
            const user = await this.findOne(id);
            if(!user) throw new Error("User doesn't exist");
            return model.update(id, updateData);
        },
        delete: async function (id) {
            return model.delete(id);
        }
    }
}

export default new UserService();