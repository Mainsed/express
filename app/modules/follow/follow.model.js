import Follow from '../../models/follow'
import userFollow from '../../models/userFollow'

function FollowModel() {
    return {
        findAll: () => {
            return Follow.findAll()
        },
        findOne: (user_id, target_id) => {
            return Follow.findOne({where: {user_id, target_id}})
        },
        findById: (user_id) => {
            return Follow.findAll({where: {user_id}})
        },
        create: (user_id, target_id) => {
            return Follow.create({
                user_id, target_id, status: 'pending'
            })
        },
        createUserFollow: (user_id, follow_id) => {
            return userFollow.create({
                user_id, follow_id
            })
        },
        setStatus: (user_id, target_id, status) => {
            return Follow.findOne({where: {user_id, target_id}})
                .then((follow) => follow.update({status}))
        },
        delete: async (user_id, target_id) => {
            const follow = await Follow.findOne({where: {user_id, target_id}})
            await userFollow.destroy({
                where: {user_id, follow_id: follow.dataValues.id}
            })
            return Follow.destroy({where: {user_id, target_id}});
        }
    }
}

export default new FollowModel();