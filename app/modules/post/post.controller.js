import service from './post.service'
import http from 'http'

function PostController() {
    return {
        findAll: async function (req, res) {
            const data = await service.findAll()
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        findOne: async function (req, res) {
            const id = req.params.id;
            const data = await service.findOne(id)
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        create: async function (req, res) {
            const {text, creator} = req.body
            const data = await service.create(text, creator)
            res.json({
                data,
                statusCode: data ? 201 : 400,
                statusMessage: data ? http.STATUS_CODES['201'] : http.STATUS_CODES['400']
            })
        },
        update: async function (req, res) {
            const id = req.params.id
            const updateData = req.body;
            const data = await service.update(id, updateData)
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            })
        },
        delete: async function (req, res) {
            const id = req.params.id
            const data = await service.delete(id)
            res.json({
                data,
                statusCode: 200,
                statusMessage: http.STATUS_CODES['200']
            })
        }
    }
}

export default new PostController;