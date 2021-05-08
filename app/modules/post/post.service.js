import model from './post.model'

function PostService() {
    return {
        findAll: async function () {
            await model.createTableIfDoesntExist();
            return model.findAll();
        },
        findOne: async function (id) {
            await model.createTableIfDoesntExist();
            const post = await model.findOne(id);
            if(!post) throw new Error("Post doesn't exist");
            return post;
        },
        create: async function (text, creator) {
            await model.createTableIfDoesntExist();
            return model.create(text, creator);
        },
        update: async function (id, updateData) {
            await model.createTableIfDoesntExist();
            const post = await this.findOne(id);
            if(!post) throw new Error("Post doesn't exist");
            return model.update(id, updateData);
        },
        delete: async function (id) {
            await model.createTableIfDoesntExist();
            return model.delete(id);
        }
    }
}

export default new PostService();