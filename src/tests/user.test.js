import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import {app} from '../app.js';
import {User} from '../models/User.model.js';
import {connectTestDB, disconnectTestDB, clearTestDB} from './db/index.js';

beforeAll(async () => {
    await connectTestDB()
})

afterEach(async () => {
    await clearTestDB()
})
afterAll(async () => {
    await disconnectTestDB()
})

describe("Users", () => {
    it("Should register a new user successfully", async () => {
        const res = await request(app).post("/api/users/register").send({username: "jo123", email: "john@mail.com", fullName: "John Doe", password: "123456"})
        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
            statusCode: 200,
            message: 'User registered Successfully',
            success: true,
            data: {
              username: 'jo123',
              email: 'john@mail.com',
              fullName: 'John Doe',
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              __v: 0
            },
        })

        expect(res.body.data).not.toHaveProperty('password')

        const userInDb = await User.findOne({ email: 'john@mail.com' });
        expect(userInDb).toBeTruthy();
        expect(userInDb.email).toBe('john@mail.com')
    })

    it("should fail to register a user with existing email or username", async () => {
        await User.create({
            username: "jo123",
            email: "john@mail.com", 
            fullName: "John Doe", 
            password: "123456"
        })

        const res = await request(app).post("/api/users/register").send({username: "jo123", email: "john@mail.com", fullName: "John Doe", password: "123456"})
        expect(res.status).toBe(409)
        expect(res.body).toMatchObject({
            success: false,
            message: "User with email or username already exists"
        })
    })

    it("All fields entity are required", async () => {
        const res = await request(app).post("/api/users/register").send({username: "", email: "john@mail.com", fullName: "John Doe", password: "123456"})

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({
            success: false,
            message: "All fields are required"
        })
    })
})