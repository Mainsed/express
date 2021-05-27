import axios from "axios";
import {refreshSchema} from '../app/modules/auth/auth.schemas'

describe('e2e user routes testing', () => {
    test('should return correct user by id', async () => {
        const users = await axios.get('http://localhost:3000/users');
        const resp = await axios.get(`http://localhost:3000/users/${users.data.data[0].id}`)
        expect(resp.data.data).toHaveProperty('id', users.data.data[0].id)
    })
    test('should return error message with incorrect user id', async () => {
        const resp = await axios.get('http://localhost:3000/users/ewf9v9ckou2n7t9')
        expect(resp.data.error).toBe("User doesn't exist")
    })
    test('should return array of users', async () => {
        const resp = await axios.get('http://localhost:3000/users')
        expect(resp.data.data).toBeInstanceOf(Array)
    })
    test('should create new user', async () => {
        const resp = await axios.put('http://localhost:3000/users', {
            name: 'name',
            email: 'email@test.com',
            password: 'pass'
        })
            .catch((e) => console.log(e))
        expect(resp.data.data).toHaveProperty('id')
        expect(resp.data.data).toHaveProperty('name')
        expect(resp.data.data).toHaveProperty('email', 'email@test.com')
    })
    test('should return error of incorrect email while creating new user', async () => {
        try {
            await axios.put('http://localhost:3000/users', {name: 'name', email: 'email', password: 'pass'})
        } catch (e) {
            expect(e.response.data).toBe('Error validating request body. Incorrect email.')
        }
    })
    test('should delete user by id', async () => {
        const users = await axios.get('http://localhost:3000/users');
        const resp = await axios.delete(`http://localhost:3000/users/${users.data.data.reverse()[0].id}`)
        expect(resp.data.data).toBe(1)
    })
    test('should update user by id', async () => {
        const users = await axios.get('http://localhost:3000/users');
        const resp = await axios.patch(`http://localhost:3000/users/${users.data.data[0].id}`, {name: 'new Name'})
        expect(resp.data.data).toHaveProperty('id', users.data.data[0].id)
        expect(resp.data.data).toHaveProperty('name', 'new Name')
    })
    test('should return error message while updating user by incorrect user id', async () => {
        const resp = await axios.patch('http://localhost:3000/users/ewf9v9cckou2n7', {name: 'new Name'})
        expect(resp.data.error).toBe("User doesn't exist");
    })
})

describe('e2e post routes testing', () => {
    test('should return correct post by id', async () => {
        const posts = await axios.get('http://localhost:3000/posts');
        const resp = await axios.get(`http://localhost:3000/posts/${posts.data.data[0].id}`)
        expect(resp.data.data).toHaveProperty('id', posts.data.data[0].id)
    })
    test('should return error message with incorrect post id', async () => {
        const resp = await axios.get('http://localhost:3000/posts/ewf9v9ckou2n7t9')
        expect(resp.data.error).toBe("Post doesn't exist")
    })
    test('should return array of posts', async () => {
        const resp = await axios.get('http://localhost:3000/posts')
        expect(resp.data.data).toBeInstanceOf(Array)
    })
    test('should create new post', async () => {
        const users = await axios.get('http://localhost:3000/users');
        const resp = await axios.put('http://localhost:3000/posts', {text: 'text', creator: users.data.data[0].id})
        expect(resp.data.data).toHaveProperty('id')
        expect(resp.data.data).toHaveProperty('creator', users.data.data[0].id)
    })
    test('should return error of requiring creator field while creating new post', async () => {
        try {
            await axios.put('http://localhost:3000/posts', {text: 'text'})
        } catch (e) {
            expect(e.response.data).toBe('Error validating request body. \"creator\" is required.')
        }
    })
    test('should delete post by id', async () => {
        const posts = await axios.get('http://localhost:3000/posts');
        const resp = await axios.delete(`http://localhost:3000/posts/${posts.data.data[0].id}`)
        expect(resp.data.data).toBe(1)
    })
    test('should update post by id', async () => {
        const posts = await axios.get('http://localhost:3000/posts');
        const resp = await axios.patch(`http://localhost:3000/posts/${posts.data.data[0].id}`, {text: 'new text'})
        expect(resp.data.data).toHaveProperty('id', posts.data.data[0].id)
        expect(resp.data.data).toHaveProperty('text', 'new text')
    })
    test('should return error message while updating post by incorrect id', async () => {
        const resp = await axios.patch('http://localhost:3000/posts/ewf9v9cckou2n7', {text: 'new text'})
        expect(resp.data.error).toBe("Post doesn't exist");
    })
})

describe('e2e follow routes testing', () => {
    test('should create follow', async () => {
        const users = await axios.get('http://localhost:3000/users');
        users.data.data = users.data.data.reverse();
        const resp = await axios.put('http://localhost:3000/follow',
            {id: users.data.data[0].id, targetId: users.data.data[1].id}).catch((e) => console.log(e))
        expect(resp.data.data).toHaveProperty('id')
        expect(resp.data.data).toHaveProperty('user_id')
        expect(resp.data.data).toHaveProperty('target_id')
    })
    test('should return error message with incorrect ids', async () => {
        const resp = await axios.put('http://localhost:3000/follow',
            {id: '123', targetId: '123'})
        expect(resp.data.statusCode).toBe(400)
        expect(resp.data.statusMessage).toBe('Bad Request')
    })
    test('should find all follows', async () => {
        const resp = await axios.get('http://localhost:3000/follow')
        expect(resp.data.data).toBeInstanceOf(Array)
    })
    test('should update follow status', async () => {
        const follows = await axios.get('http://localhost:3000/follow')
        const resp = await axios.patch('http://localhost:3000/follow',
            {status: 'accepted', id: follows.data.data[0].user_id, targetId: follows.data.data[0].target_id}
            )
        expect(resp.data.data.status).toBe('accepted')
    })
    test('should delete follow', async () => {
        const follows = await axios.get('http://localhost:3000/follow')
        const resp = await axios.delete(`http://localhost:3000/follow/${follows.data.data[0].user_id}/${follows.data.data[0].target_id}`)
        expect(resp.data.data).toBeGreaterThanOrEqual(1);
    })
})

describe('e2e auth routes testing', () => {
    test('should return expired token message while auth with access', async () => {
        const resp = await axios.get('http://localhost:3000/auth?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0NDljYmY5LTMzNjQtNDQ3MS04YTZiLTM1ZGQxMGMyNzRkNCIsImlhdCI6MTYyMTUwNDUwMH0.Wrzsg0hcVhms_8qkwopFT7Rrcj4AK8GCvZX69tUKi9w')
        expect(resp.data).toBe('Access token has expired')
    })
    test('should return user info while logging', async () => {
        const resp = await axios.post(`http://localhost:3000/auth/login`, {email: 'email@test.com', password: 'pass'})
        expect(resp.data).toHaveProperty('user')
        expect(resp.data.user).toHaveProperty('id')
        expect(resp.data).toHaveProperty('userAuth')
        expect(resp.data.userAuth).toHaveProperty('access')
        expect(resp.data.userAuth).toHaveProperty('refresh')
    })
    test('should return user id from access token while auth', async () => {
        // const aa = await refreshSchema.findOne()
        // console.log(aa.refresh_token)
        // const access_token = auth.access_token
        // const resp = await axios.get(`http://localhost:3000/auth?access_token=${access_token}`)
        // expect(resp.data).toHaveProperty('id')
    })
    test('should return new refresh and access token', async () => {
        // const aa = await refreshSchema.findOne()
        // console.log(aa.refresh_token)
        // const refresh_token = auth.refresh_token
        // const resp = await axios.post(`http://localhost:3000/auth?refresh_token=${refresh_token}`)
        // expect(resp.data).toHaveProperty('id')
    })
    test('should return error message with invalid refresh_token', async () => {
        const resp = await axios.post(`http://localhost:3000/auth?refresh_token=refreshtoken`)
        expect(resp.data).toBe('jwt malformed')
    })
    test('should return create new user and return user info', async () => {
        const resp = await axios.post(`http://localhost:3000/auth/signup`, {
            name: 'name',
            email: 'email@gmail.com',
            password: 'pass'
        })
        expect(resp.data.user).toHaveProperty('id')
        expect(resp.data.user).toHaveProperty('name')
        expect(resp.data.user).toHaveProperty('password')
        expect(resp.data.user).toHaveProperty('email')
    })
})