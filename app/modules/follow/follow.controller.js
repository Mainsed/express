import service from './follow.service'
import http from 'http'

function FollowController() {
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
        findById: async function (req, res) {
            let error;
            const id = req.params.id;
            const data = await service.findById(id).catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        create: async function (req, res) {
            let error;
            const {id, targetId} = req.body
            const data = await service.create(id, targetId).catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: data ? 201 : 400,
                statusMessage: data ? http.STATUS_CODES['201'] : http.STATUS_CODES['400']
            })
        },
        setStatus: async function (req, res) {
            let error;
            const {status, id, targetId} = req.body;
            const data = await service.setStatus(id, targetId, status).catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            })
        },
        delete: async function (req, res) {
            let error;
            const {id, targetId} = req.params
            const data = await service.delete(id, targetId)//.catch((e)=>{error=e.message})
            res.json({
                data,
                error,
                statusCode: 200,
                statusMessage: http.STATUS_CODES['200']
            })
        }
    }
}

export default new FollowController();