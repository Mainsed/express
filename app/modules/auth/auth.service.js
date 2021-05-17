import model from './auth.model'

function FollowService() {
    return {
        find: async function () {
            return model.find();
        },
        create: async function (id, targetId) {
            const follow = await model.create(id, targetId);
            await model.createUserFollow(follow.dataValues.user_id, follow.dataValues.id)
            return follow;
        },
        delete: async function (id, targetId) {
            return model.delete(id, targetId);
        }
    }
}

export default new FollowService();