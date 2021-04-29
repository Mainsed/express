const model = require('./user.models').UserModels

function UserService() {
    return {
        findAll: async function () {
            return model().findAll();
        },
        findOne: async function (id) {
            return model().findOne(id);
        },
        create: async function (name) {
            return model().create(name);
        },
        update: async function (id, data) {
            return model().update(id, data);
        },
        delete: async function (id) {
            return model().delete(id);
        }
    }
}

exports.UserService = UserService;