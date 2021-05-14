import model from './follow.model'

function FollowService() {
    return {
        findAll: async function () {
            return model.findAll();
        },
        findById: async function (id) {
            return await model.findById(id)
        },
        create: async function (id, targetId) {
            const follow = await model.create(id, targetId);
            await model.createUserFollow(follow.dataValues.user_id, follow.dataValues.id)
            return follow;
        },
        setStatus: async function (id, targetId, status) {
            const follow = await model.findOne(id, targetId)
            if (!follow) return null;
            return model.setStatus(id, targetId, status);
        },
        delete: async function (id, targetId) {
            return model.delete(id, targetId);
        }
    }
}

export default new FollowService();