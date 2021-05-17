import service from './auth.service'
import http from 'http'

function FollowController() {
    return {
        find: async function (req, res) {
            const data = await service.find()
            res.json({
                data,
                statusCode: data ? 200 : 404,
                statusMessage: data ? http.STATUS_CODES['200'] : http.STATUS_CODES['404']
            });
        },
        
        create: async function (req, res) {
            const {id, targetId} = req.body
            const data = await service.create(id, targetId)
            res.json({
                data,
                statusCode: data ? 201 : 400,
                statusMessage: data ? http.STATUS_CODES['201'] : http.STATUS_CODES['400']
            })
        },
        
        delete: async function (req, res) {
            const {id, targetId} = req.params
            const data = await service.delete(id, targetId)
            res.json({
                data,
                statusCode: 200,
                statusMessage: http.STATUS_CODES['200']
            })
        }
    }
}

export default new FollowController();