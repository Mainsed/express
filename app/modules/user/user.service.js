import model from './user.model'

function UserService() {
    return {
        findAll: async function () {
            await model.createTableIfDoesntExist();
            return model.findAll();
        },
        findOne: async function (id) {
            await model.createTableIfDoesntExist();
            const user = await model.findOne(id);
            if(!user) throw new Error("User doesn't exist");
            return user;
        },
        create: async function (name, email) {
            await model.createTableIfDoesntExist();
            return model.create(name, email);
        },
        update: async function (id, updateData) {
            await model.createTableIfDoesntExist();
            const user = await this.findOne(id);
            if(!user) throw new Error("User doesn't exist");
            return model.update(id, updateData);
        },
        delete: async function (id) {
            await model.createTableIfDoesntExist();
            return model.delete(id);
        }
    }
}

export default new UserService();