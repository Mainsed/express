const fs = require('fs').promises;
const uniqid = require('uniqid');
const dotenv = require('dotenv');
const {PATH} = dotenv.config().parsed;

const entities = {
    USERS: 'Users',
    POSTS: 'Posts'
};

class fileWorker {
    constructor(entityName) {
        this.entityName = entityName;
    }

    async createDir() {
        let isExist = await this.checkDir();
        if (!isExist)
            await fs.mkdir(PATH);
    }

    async create(file) {
        const isExist = await this.checkFile(file);
        if (!isExist)
            return await fs.writeFile(`${PATH}/${file}.json`, JSON.stringify([]));
    }

    async checkDir() {
        return fs.access(PATH).then(() => true).catch(() => false)
    }

    async checkFile(file) {
        return fs.access(`${PATH}/${file}.json`).then(() => true).catch(() => false)
    }

    async deleteEntity(entity, id) {
        const isExist = await this.checkFile(entity);
        if (!isExist) return null;
        return this.getAll(entity).then((arr) => {
            const newArr = arr.filter(entry => entry.id !== id);
            return fs.writeFile(`${PATH}/${entity}.json`, JSON.stringify(newArr))
                .catch(console.log)
                .then(() => newArr);
        })
    }

    async get(entity, id) {
        return this.getAll(entity)
            .then((res) => res
                .filter((ent) => ent.id === id)
                .map((ent) => Object.assign(ent, {created: true}))[0]
            )
    }

    async getAll(entity) {
        const isExist = await this.checkFile(entity);
        if (!isExist) await this.createPath();
        return fs.readFile(`${PATH}/${entity}.json`)
            .catch(console.log)
            .then((res) => JSON.parse(res.toString('utf-8')))
    }

    async createPath() {
        const dir = await this.createDir().catch((e) => console.log(e));
        const file = await this.create(this.entityName).catch((e) => console.log(e));
        return Promise.all([dir, file]);
    }

    async createEntity(entity, data) {
        await this.createPath();
        return this.getAll(entity).then((arr) => {
            const newArr = arr ? [...arr, data] : [data]
            return fs.writeFile(`${PATH}/${entity}.json`, JSON.stringify(newArr))
                .catch(console.log)
                .then(() => data)
        })
    }

    async updateEntity(entity, id, newContent) {
        const isExist = await this.checkFile(entity);
        if (!isExist) return null;
        return this.getAll(entity).then((arr) => {
            const newArr = arr.map((entity) => {
                if (entity.id === id) return Object.assign({}, entity, newContent, {id: id})
                return entity
            })
            return fs.writeFile(`${PATH}/${entity}.json`, JSON.stringify(newArr))
                .catch(console.log)
                .then(() => newContent);
        })
    }
}

class User extends fileWorker {
    constructor(name) {
        super(entities.USERS);
        this.id = uniqid();
        this.name = name;
        this.created = false;
    }

    async save() {
        if (this.created)
            await this.updateEntity(entities.USERS, this.id, {name: this.name})
        else await this.createEntity(entities.USERS,
            {id: this.id, name: this.name})
        this.created = true;
        return this
    }

    async getUser(id) {
        return super.get(entities.USERS, id);
    }

    async update(newData) {
        return Object.assign(this, newData);
    }

    async delete() {
        await super.deleteEntity(entities.USERS, this.id);
        return this
    }

    async createPost(text) {
        const post = new Post(this.id, text);
        await post.save();
        return post;
    }
}

class Post extends fileWorker {
    constructor(creatorId, text) {
        super(entities.POSTS);
        this.id = uniqid();
        this.creatorId = creatorId;
        this.text = text;
        this.created = false;
    }

    async save() {
        if (this.created)
            await this.updateEntity(entities.POSTS, this.id, {name: this.name})
        else await this.createEntity(entities.POSTS,
            {id: this.id, creatorId: this.creatorId, text: this.text})
        this.created = true;
        return this;
    }

    async delete() {
        super.deleteEntity(entities.POSTS, this.id);
        return this;
    }

    getPost(id) {
        return super.get(entities.POSTS, id)
    }

    update(newData) {
        return Object.assign(this, newData)
    }
}

async function start1() {
    let user1, user2
    user1 = await new User('John Doe')
    user2 = await new User('John Doe')
    await user1.delete();
    await user1.createPost('newPost')

    await user2.save()

    await user1.save()

    const a = await user1.getUser(user2.id);
    console.log(a)

    await user2.update({name: 'James Koul'})

    await user2.save()

    await user1.delete()
}

async function start2() {
    let user1, user2;
    let post;
    user1 = new User('John Doe')
    user2 = new User('John Doe')
    post = await user2.createPost('Delete me')
    await user1.createPost('newPost')

    await user2.save()

    await user1.save()

    await post.delete()
}


//start1();//v failah 1 post s id usera cotoriy bil udalen i 1 user2
//start2();//v failah 1 post i 2 chela
exports.fileWorker = fileWorker;