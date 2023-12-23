// const request = require('supertest');

import request from 'supertest';
const app='http://localhost:3001';
// const uuid = require('uuid');
import uuid from 'uuid';
import User from '../models/userModel.js';


// Test user registration
describe('User registration', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

  it('should register a new user', async () => {
    // const st = uuid.v4();
    // console.log(st+'@gmail.com')
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: 'johndoe'+'@gmail.com',
        password: '123456',
        })
        .expect(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).not.toHaveProperty('password');
    }
    );
    it('should not register a new user with an existing email', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            })
            .expect(400);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('User already exists');
    }
    );
});


// Test user login
describe('User login', () => {

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/users/auth')
            .send({
            email: 'johndoe@gmail.com',
            password: '123456',
            })
            .expect(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('email');
        expect(res.body).not.toHaveProperty('password');
    }
    );
    it('should not login a user with an incorrect password', async () => {
        const res = await request(app)
            .post('/api/users/auth')
            .send({
            email: 'johndoe@gmail.com',
            password: '1234567',
            })
            .expect(401);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Invalid email or password');
    }
    );
});

// Test user logout
describe('User logout', () => {


    it('should logout a logged in user', async () => {
        const res = await request(app)
            .post('/api/users/logout')
            .send({
            email: 'johndoe@gmail.com',
            password: '123456',
            })
            .expect(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Logged out successfully');
    }
    );
});