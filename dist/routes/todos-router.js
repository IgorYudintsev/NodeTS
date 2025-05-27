"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
exports.todosRouter = (0, express_1.Router)();
const todos = [
    {
        todolistId: (0, uuid_1.v1)(),
        title: "Monday",
        tasks: [
            { taskId: (0, uuid_1.v1)(), title: "HTML&CSS", isDone: true, priority: "high" },
            { taskId: (0, uuid_1.v1)(), title: "JS", isDone: false, priority: "medium" }
        ],
    },
    {
        todolistId: (0, uuid_1.v1)(),
        title: "Tuesday",
        tasks: [
            { taskId: (0, uuid_1.v1)(), title: "HTML&CSS2", isDone: false, priority: "low" },
            { taskId: (0, uuid_1.v1)(), title: "JS2", isDone: true, priority: "high" }
        ],
    }
];
exports.todosRouter.get("/", (req, res) => {
    if (!todos || todos.length === 0) {
        res.status(404).send("No todos found");
    }
    else {
        res.send(todos);
    }
});
exports.todosRouter.post("/task", (req, res) => {
    try {
        // Валидация
        if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }
        const { todolistId, title, priority = "medium" } = req.body;
        if (!todolistId) {
            res.status(400).json({ error: "Todolist ID is required" });
            return;
        }
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        const validPriorities = ["high", "medium", "low"];
        if (priority && !validPriorities.includes(priority)) {
            res.status(400).json({ error: "Invalid priority value" });
            return;
        }
        // Создание нового списка
        const newTask = {
            taskId: (0, uuid_1.v1)(),
            title: title.trim(),
            isDone: false,
            priority: priority
        };
        // Находим нужный todolist и добавляем задачу
        const todoList = todos.find(el => el.todolistId === todolistId);
        if (!todoList) {
            res.status(404).json({ error: "Todolist not found" });
            return;
        }
        todoList.tasks.push(newTask);
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.todosRouter.delete("/:id", (req, res) => {
    let currentTodo = todos.find(el => el.todolistId === req.params.id);
    if (currentTodo) {
        todos.splice(todos.indexOf(currentTodo), 1);
        res.send(todos);
    }
    else {
        res.status(404).json({ message: "Todo Not Found" });
    }
});
exports.todosRouter.delete("/:todolistID/tasks/:taskID", (req, res) => {
    let currentTodo = todos.find(el => el.todolistId === req.params.todolistID);
    if (currentTodo) {
        let currentTask = currentTodo.tasks.find(el => el.taskId === req.params.taskID);
        if (currentTask) {
            currentTodo.tasks.splice(currentTodo.tasks.indexOf(currentTask), 1);
            res.send(todos);
        }
        else {
            res.status(404).json({ message: "Task Not Found" });
        }
    }
    else {
        res.status(404).json({ message: "Todo Not Found" });
    }
});
exports.todosRouter.put("/:id", (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }
        const { title } = req.body;
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        const currentTodo = todos.find(el => el.todolistId === req.params.id);
        if (currentTodo) {
            currentTodo.title = title.trim();
            res.status(200).json(todos);
        }
        else {
            res.status(404).json({ message: "Todo Not Found" });
        }
    }
    catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.todosRouter.put("/:todolistID/tasks/:taskID", (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({ error: "Request body is missing" });
            return;
        }
        const { title } = req.body;
        if (!(title === null || title === void 0 ? void 0 : title.trim())) {
            res.status(400).json({ error: "Title is required" });
            return;
        }
        const currentTodo = todos.find(el => el.todolistId === req.params.todolistID);
        if (currentTodo) {
            let currentTask = currentTodo.tasks.find(el => el.taskId === req.params.taskID);
            if (currentTask) {
                currentTask.title = title.trim();
                res.status(200).json(todos);
            }
            else {
                res.status(404).json({ message: "Task Not Found" });
            }
        }
        else {
            res.status(404).json({ message: "Todo Not Found" });
        }
    }
    catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// app.get("/todos/:filterValue", (req: Request, res: Response) => {
//     const filterValue=req.params.filterValue as FilterValuesType
//     const filteredTodos = todos.filter(todo => todo.filter === filterValue);
//     if (filterValue === "toLearn" || filterValue === "toDo") {
//         res.send(filteredTodos);
//     } else {
//         res.status(404).send("Not Found. Invalid filter. Use 'toLearn' or 'toDo");
//     }
// });
