import {fileWorker} from '../../lib/fileWorker'
import uniqid from 'uniqid'
function UserModel() {
    //const Users = new Users();//cannot access "Users" before initialization
    const Users = new fileWorker('Users');
    return {
        findAll: async () => {
            return await Users.getAll()
        },
        findOne: async (id) => {
            return Users.get(id)
        },
        create: async (name) => {
            return Users.createEntity({id: uniqid(), name})
        },
        update: async (id, updateData) => {
            return Users.updateEntity(id, updateData)
        },
        delete: async (id) => {
            return Users.deleteEntity(id)
        }
    }
}
export default new UserModel();