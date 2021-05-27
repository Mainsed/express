import service from '../app/modules/user/user.service'
import model from '../app/modules/user/user.model'
import {jest} from '@jest/globals'

describe('post testing', () => {

    const serviceProto = Object.getPrototypeOf(service);

    test('should return undefined with correct user id while finding', async () => {
        model.findOne = jest.fn(()=>true);
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        const resp = await service.findOne('id')
        expect(resp).toBeTruthy();
    })
    test('shoult throw Error with incorrect user id while finding',async()=>{
        model.findOne = jest.fn();
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        try{
        await service.findOne('id')
        } catch (e) {
            expect(e.message).toBe('User doesn\'t exist')
        }
    })

    test('should return undefined with correct user id while updating', async () => {
        model.findOne = jest.fn(()=>true);
        model.update = jest.fn();
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        const resp = await service.update('id', 'data')
        expect(resp).toBeUndefined();
    })
    test('shoult throw Error with incorrect user id while updating',async()=>{
        model.findOne = jest.fn();
        model.update = jest.fn();
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));

        try{
            await service.update('id','data')
        } catch (e) {
            expect(e.message).toBe('User doesn\'t exist')
        }
    })
})