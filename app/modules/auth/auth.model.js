import {authSchema as Auth} from './auth.schemas'
import LocalStrategy from 'passport-local'
import passport from 'passport'

function FollowModel() {
    return {
        find: () => {
            console.log('find')
            return false
        },
        create: (user_id, target_id) => {
            return Auth.create({
                user_id, target_id, status: 'pending'
            })
        },
        delete: (user_id, target_id) => {
            return Auth.destroy({ where: { user_id, target_id } })
        }
    }
}

export default new FollowModel();