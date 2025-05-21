"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
const todos = [
    {
        todolistId: (0, uuid_1.v1)(),
        filter: 'toLearn',
        title: "What to learn",
        tasks: [
            { taskId: (0, uuid_1.v1)(), title: "HTML&CSS", isDone: true, priority: "high" },
            { taskId: (0, uuid_1.v1)(), title: "JS", isDone: false, priority: "medium" }
        ],
    },
    {
        todolistId: (0, uuid_1.v1)(),
        filter: 'toDo',
        title: "What to do",
        tasks: [
            { taskId: (0, uuid_1.v1)(), title: "HTML&CSS2", isDone: false, priority: "low" },
            { taskId: (0, uuid_1.v1)(), title: "JS2", isDone: true, priority: "high" }
        ],
    }
];
const books = [{ volume: 'Book1' }, { volume: 'Book2' }];
app.get("/todos", (req, res) => {
    const keyFilter = req.query.keyFilter;
    const filteredTasks = todos.map(todo => (Object.assign(Object.assign({}, todo), { tasks: todo.tasks.filter(task => keyFilter === 'active' ? !task.isDone : task.isDone) })));
    if (keyFilter === "active" || keyFilter === "completed") {
        res.send(filteredTasks);
    }
    else {
        res.status(404).send("Not Found");
    }
});
app.get("/todos/:filterValue", (req, res) => {
    const filterValue = req.params.filterValue;
    const filteredTodos = todos.filter(todo => todo.filter === filterValue);
    if (filterValue === "toLearn" || filterValue === "toDo") {
        res.send(filteredTodos);
    }
    else {
        res.status(404).send("Not Found. Invalid filter. Use 'toLearn' or 'toDo");
    }
});
app.get("/books", (req, res) => {
    res.send(books);
});
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!!!" });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
