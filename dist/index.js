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
app.use(express_1.default.json()); // Добавляем middleware для парсинга JSON тела которое приходит в post
const books = [{ volume: 'Book1' }, { volume: 'Book2' }];
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
// Метод создания нового тудулиста
// app.post("/todos", (req: Request<{}, {}, CreateTodoListRequest>, res: Response<ObjectType | { error: string }>) => {
//     try {
//         // Валидация
//         if (!req.body) {
//             res.status(400).json({ error: "Request body is missing" });
//             return;
//         }
//
//         const { title, filter } = req.body;
//
//         if (!title?.trim() || !filter) {
//             res.status(400).json({ error: "Title and filter are required" });
//             return;
//         }
//
//         if (!['toLearn', 'toDo'].includes(filter)) {
//             res.status(400).json({ error: "Invalid filter value. Use 'toLearn' or 'toDo'" });
//             return;
//         }
//
//         // Создание нового списка
//         const newTodoList: ObjectType = {
//             todolistId: v1(),
//             title: title.trim(),
//             filter,
//             tasks: []
//         };
//
//         todos.push(newTodoList);
//         res.status(201).json(newTodoList);
//
//     } catch (error) {
//         console.error("Error creating todo list:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!!!" });
});
app.get("/books", (req, res) => {
    res.send(books);
});
//Метод создания новой книги
app.post("/books", (req, res) => {
    const { volume } = req.body; // Приведение типа
    const newBook = { volume };
    books.push(newBook);
    res.status(201).json(newBook);
});
app.get("/todos", (req, res) => {
    const keyFilter = req.query.keyFilter;
    if (!keyFilter) {
        res.send(todos);
        return;
    }
    if (keyFilter !== "active" && keyFilter !== "completed" && keyFilter !== "all") {
        res.status(400).send("Invalid filter. Use 'all', 'active' or 'completed'");
        return;
    }
    const filteredTodos = todos.map(todo => (Object.assign(Object.assign({}, todo), { tasks: todo.tasks.filter(task => keyFilter === "active" ? !task.isDone :
            keyFilter === "completed" ? task.isDone :
                true) })));
    res.send(filteredTodos);
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
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
