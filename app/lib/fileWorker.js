import {promises as fs} from 'fs'
import dotenv from 'dotenv'
const {PATH} = dotenv.config().parsed;

const entities = {
    USERS: 'Users',
    POSTS: 'Posts'
};

export class fileWorker {
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

    async deleteEntity(id) {
        const isExist = await this.checkFile(this.entityName);
        if (!isExist) return null;
        return this.getAll(this.entityName).then((arr) => {
            const newArr = arr.filter(entry => entry.id !== id);
            return fs.writeFile(`${PATH}/${this.entityName}.json`, JSON.stringify(newArr))
                .catch(console.log)
                .then(() => newArr);
        })
    }

    async get(id) {
        return this.getAll(this.entityName)
            .then((res) => res
                .filter((ent) => ent.id === id)
                .map((ent) => Object.assign(ent, {created: true}))[0]
            )
    }

    async getAll() {
        const isExist = await this.checkFile(this.entityName);
        if (!isExist) await this.createPath();
        return fs.readFile(`${PATH}/${this.entityName}.json`)
            .catch(console.log)
            .then((res) => JSON.parse(res.toString('utf-8')))
    }

    async createPath() {
        const dir = await this.createDir().catch((e) => console.log(e));
        const file = await this.create(this.entityName).catch((e) => console.log(e));
        return Promise.all([dir, file]);
    }

    async createEntity(data) {
        await this.createPath();
        return this.getAll(this.entityName).then((arr) => {
            const newArr = arr ? [...arr, data] : [data]
            return fs.writeFile(`${PATH}/${this.entityName}.json`, JSON.stringify(newArr,null,2))
                .catch(console.log)
                .then(() => data)
        })
    }

    async updateEntity(id, newContent) {
        const isExist = await this.checkFile(this.entityName);
        if (!isExist) return null;
        return this.getAll(this.entityName).then((arr) => {
            const newArr = arr.map((entity) => {
                if (entity.id === id) return Object.assign({}, entity, newContent, {id: id})
                return entity
            })
            return fs.writeFile(`${PATH}/${this.entityName}.json`, JSON.stringify(newArr,null,2))
                .catch(console.log)
                .then(() => newContent);
        })
    }
}

export function Users () {
    return new fileWorker(entities.USERS)
}

export function Posts () {
    return new fileWorker(entities.POSTS)
}