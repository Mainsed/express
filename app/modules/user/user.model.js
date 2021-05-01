import {fileWorker} from '../../lib/fileWorker'
import uniqid from 'uniqid'
function UserModel() {
    //const Users = new Users();//cannot access "Users" before initialization
    const Users = new fileWorker('Users');
    return {
        findAll: () => {
            return Users.getAll()
        },
        findOne: (id) => {
            return Users.get(id)
        },
        create: (name) => {
            return Users.createEntity({id: uniqid(), name})
        },
        update: (id, updateData) => {
            return Users.updateEntity(id, updateData)
        },
        delete: (id) => {
            return Users.deleteEntity(id)
        }
    }
}
export default new UserModel();