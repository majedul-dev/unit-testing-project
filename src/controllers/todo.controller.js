import Todo from "../models/Todo.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createTodo = asyncHandler(async (req, res) => {
    const { title, completed } = req.body
    
    const todo = new Todo({ title, completed })
    await todo.save()

    res.status(201).json(new ApiResponse(201, todo, "new todo created successfully"))
})

export {createTodo}