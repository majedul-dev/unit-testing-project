import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import request from 'supertest';
import {app} from '../app.js';
import Todo from '../models/Todo.js';
import {connectTestDB, disconnectTestDB, clearTestDB} from './db/index.js';

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe('Todo API', () => {
  let todoId;

  it('should create a new todo', async () => {
    const res = await request(app).post('/api/todos').send({ title: 'Test Todo' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      statusCode: 201,
      message: 'new todo created successfully',
      success: true,
      data: {
        title: 'Test Todo',
        completed: false,
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
    todoId = res.body._id;
  });

  it('should fetch all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0); // Should be empty as tests are isolated
  });

  it('should fetch a single todo by ID', async () => {
    const todo = await Todo.create({ title: 'Fetch Test Todo' });
    const res = await request(app).get(`/api/todos/${todo._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(String(todo._id));
  });

  it('should update a todo', async () => {
    const todo = await Todo.create({ title: 'Update Test Todo' });
    const res = await request(app).put(`/api/todos/${todo._id}`).send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const todo = await Todo.create({ title: 'Delete Test Todo' });
    const res = await request(app).delete(`/api/todos/${todo._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo deleted');
  });
});
