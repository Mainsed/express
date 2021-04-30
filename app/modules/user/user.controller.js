import service from './user.service'
import http from 'http'

function UserController() {
    return {
        findAll: async function (req, res) {
            const data = await service.findAll()
                .catch((e) => {console.log(e)})
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        findOne: async function (req, res) {
            const id = req.params.id;
            if (!id) throw new Error('No id contained');
            const data = await service.findOne(id)
                .catch((e) => {console.log(e)})
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        create: async function (req, res) {
            const data = await service.create(name)
                .catch((e) => {console.log(e)})
            res.json({
                data,
                statusCode: data ? 201 : 400,
                statusMessage: data ? http.STATUS_CODES['201'] : http.STATUS_CODES['400']
            })
        },
        update: async function (req, res) {
            const id = req.params.id
            const updateData = req.body.updateData;
            const data = await service.update(id, updateData)
                .catch((e) => {console.log(e)})
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            })
        },
        delete: async function (req, res) {
            const id = req.params.id
            const data = await service.delete(id)
                .catch((e) => {console.log(e)})
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            })
        }
    }
}

export default new UserController;