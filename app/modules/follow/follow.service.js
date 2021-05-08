import model from './follow.model'

function FollowService() {
    return {
        findAll: async function () {
            await model.createTableIfDoesntExist();
            return model.findAll();
        },
        findById: async function (id) {
            return await model.findById(id)
        },
        create: async function (id, targetId) {
            await model.createTableIfDoesntExist();
            return model.create(id, targetId);
        },
        setStatus: async function (id, targetId, status) {
            await model.createTableIfDoesntExist();
            const follow = await model.findOne(id, targetId)
            if(!follow) return null;
            return model.setStatus(id, targetId, status);
        },
        delete: async function (id, targetId) {
            await model.createTableIfDoesntExist();
            return model.delete(id, targetId);
        }
    }
}

export default new FollowService();