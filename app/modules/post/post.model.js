import Post from '../../models/post'

function PostModel() {
    return {
        findAll: () => {
            return Post.findAll()
        },
        findOne: (id) => {
            return Post.findOne({where: {id}})
        },
        create: (text, creator) => {
            return Post.create({
                text,
                creator
            })
        },
        update: async (id, updateData) => {
            return Post.findOne({where: {id}})
                .then((post) => post.update(updateData))
        },
        delete: (id) => {
            return Post.destroy({where: {id}})
        }
    }
}

export default new PostModel();