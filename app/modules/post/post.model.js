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
        update: (id, updateData) => {
            return Post.findOne({where: {id}})
                .then((post) => post.update(updateData))
        },
        delete: (id) => {
            return Post.destroy({where: {id}})
        },
        deleteAllPostByUser: (creator) => {
            return Post.destroy({where: {creator}})
        },
    }
}

export default new PostModel();