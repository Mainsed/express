import service from '../app/modules/post/post.service'
import model from '../app/modules/post/post.model'
import {jest} from '@jest/globals'

describe('post testing', () => {

    const serviceProto = Object.getPrototypeOf(service);

    test('should return undefined with correct post id while finding', async () => {
        model.findOne = jest.fn(()=>true);
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        const resp = await service.findOne('id')
        expect(resp).toBeTruthy();
    })
    test('shoult throw Error with incorrect post id while finding',async()=>{
        model.findOne = jest.fn();
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        try{
        await service.findOne('id')
        } catch (e) {
            expect(e.message).toBe('Post doesn\'t exist')
        }
    })

    test('should return undefined with correct post id while updating', async () => {
        model.findOne = jest.fn(()=>true);
        model.update = jest.fn();
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        const resp = await service.update('id', 'data')
        expect(resp).toBeUndefined();
    })
    test('shoult throw Error with incorrect post id while updating',async()=>{
        model.findOne = jest.fn();
        model.update = jest.fn();
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        try{
            await service.update('id','data')
        } catch (e) {
            expect(e.message).toBe('Post doesn\'t exist')
        }
    })
})