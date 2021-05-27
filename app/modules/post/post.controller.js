import service from './post.service'
import http from 'http'

function PostController() {
    return {
        findAll: async function (req, res) {
            let error;
            const data = await service.findAll().catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        findOne: async function (req, res) {
            let error;
            const id = req.params.id;
            const data = await service.findOne(id).catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        create: async function (req, res) {
            let error;
            const {text, creator} = req.body
            const data = await service.create(text, creator).catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: data ? 201 : 400,
                statusMessage: data ? http.STATUS_CODES['201'] : http.STATUS_CODES['400']
            })
        },
        update: async function (req, res) {
            let error;
            const id = req.params.id
            const updateData = req.body;
            const data = await service.update(id, updateData).catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            })
        },
        delete: async function (req, res) {
            let error;
            const id = req.params.id
            const data = await service.delete(id).catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: 200,
                statusMessage: http.STATUS_CODES['200']
            })
        }
    }
}

export default new PostController;