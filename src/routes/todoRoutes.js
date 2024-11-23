import express from 'express';
import Todo from '../models/Todo.js';
import {createTodo} from "../controllers/todo.controller.js"

const router = express.Router();

// Create a new Todo
router.post('/',createTodo
  // async (req, res) => {
  // try {
  //   const todo = new Todo(req.body);
  //   await todo.save();
  //   res.status(201).json(todo);
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
  // }
);

// Get all Todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Get a single Todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a Todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
