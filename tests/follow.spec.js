import service from '../app/modules/follow/follow.service'
import model from '../app/modules/follow/follow.model'
import {jest} from '@jest/globals'

describe('follow testing', () => {

    model.setStatus = jest.fn();
    const serviceProto = Object.getPrototypeOf(service);
    Object.setPrototypeOf(service, Object.assign(serviceProto, model));

    test('should return undefined with correct user ids', async () => {
        model.findOne = jest.fn(()=>true);
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));
        const resp = await service.setStatus('0449cbf9-3364-4471-8a6b-35dd10c274d4', 'ewf9v9cckou2n7t9', 'rejected')
        expect(resp).toBeUndefined();
    })
    test('shoult return null with incorrect user ids',async()=>{
        model.findOne = jest.fn();
        Object.setPrototypeOf(service, Object.assign(serviceProto, model));
        const resp = await service.setStatus('id', 'id2', 'status')
        expect(resp).toBeNull()
    })
})