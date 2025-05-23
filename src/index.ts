import express, {NextFunction, Request, Response} from 'express';
import cors from "cors";
import {v1} from "uuid";

const app = express();
const port = 3000;
app.use(cors());// Включаем CORS, чтобы разрешить запросы с других доменов
app.use(express.json());// Добавляем middleware для парсинга JSON тела которое приходит в post

type ObjectType = {
    title: string
    tasks: Array<TasksType>
    todolistId: string
}
export type TasksType = {
    taskId: string
    title: string
    priority: "high" | "medium" | "low"
    isDone: boolean
}
export type KeyFilterType = "all" | "active" | "completed";


// Тип для входящих данных при создании тудулиста
type CreateTodoListRequest = {
    title: string;
};

// Тип для входящих данных при создании тудулиста
type CreateBookType = {
    volume: string;
};

const books = [{volume: 'Book1'}, {volume: 'Book2'}]

const todos: ObjectType[] = [
    {
        todolistId: v1(),
        title: "Monday",
        tasks: [
            {taskId: v1(), title: "HTML&CSS", isDone: true, priority: "high"},
            {taskId: v1(), title: "JS", isDone: false, priority: "medium"}
        ],
    },
    {
        todolistId: v1(),
        title: "Tuesday",
        tasks: [
            {taskId: v1(), title: "HTML&CSS2", isDone: false, priority: "low"},
            {taskId: v1(), title: "JS2", isDone: true, priority: "high"}
        ],
    }
]


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


app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello TypeScript!!!"});
});

app.get("/books", (req: Request, res: Response) => {
    res.send(books);
});

//Метод создания новой книги
app.post("/books", (req: Request, res: Response) => {
    const { volume } = req.body as { volume: string }; // Приведение типа
    const newBook = { volume };
    books.push(newBook);
    res.status(201).json(newBook);
});



app.get("/todos", (req: Request, res: Response) => {
    const keyFilter = req.query.keyFilter as KeyFilterType | undefined;

    if (!keyFilter) {
        res.send(todos);
        return;
    }

    if (keyFilter !== "active" && keyFilter !== "completed" && keyFilter !== "all") {
        res.status(400).send("Invalid filter. Use 'all', 'active' or 'completed'");
        return;
    }

    const filteredTodos = todos.map(todo => ({
        ...todo,
        tasks: todo.tasks.filter(task =>
            keyFilter === "active" ? !task.isDone :
                keyFilter === "completed" ? task.isDone :
                    true
        )
    }));

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

