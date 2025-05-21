import express,{Request,Response} from 'express';
import cors from "cors";
import {v1} from "uuid";
const app = express();
const port = 3000;
app.use(cors());// Включаем CORS, чтобы разрешить запросы с других доменов

type ObjectType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
    todolistId:string
  }
export type TasksType = {
    taskId: string
    title: string
    priority:"high" | "medium"| "low"
    isDone: boolean
}

export type KeyFilterType = "all" | "active" | "completed";
export type FilterValuesType = 'toLearn' | 'toDo'

const todos:ObjectType[]=[
    {
        todolistId:v1(),
        filter:'toLearn',
        title: "What to learn",
                 tasks: [
                {taskId: v1(), title: "HTML&CSS", isDone: true,priority:"high"},
                {taskId: v1(), title: "JS", isDone: false,priority:"medium"}
            ],
        },
        {
            todolistId:v1(),
            filter:'toDo',
            title: "What to do",
            tasks: [
                {taskId: v1(), title: "HTML&CSS2", isDone: false,priority:"low"},
                {taskId: v1(), title: "JS2", isDone: true,priority:"high"}
            ],
        }
]

const books=[{volume:'Book1'},{volume:'Book2'}]


app.get("/todos", (req: Request, res: Response) => {
    const keyFilter=req.query.keyFilter as KeyFilterType;

    const filteredTasks = todos.map(todo => ({
        ...todo,
        tasks: todo.tasks.filter(task =>keyFilter==='active'? !task.isDone:task.isDone)
    }));
    if (keyFilter === "active" || keyFilter === "completed") {
        res.send(filteredTasks);
    } else {
        res.status(404).send("Not Found");
    }
});


app.get("/todos/:filterValue", (req: Request, res: Response) => {
    const filterValue=req.params.filterValue as FilterValuesType
    const filteredTodos = todos.filter(todo => todo.filter === filterValue);
    if (filterValue === "toLearn" || filterValue === "toDo") {
        res.send(filteredTodos);
    } else {
        res.status(404).send("Not Found. Invalid filter. Use 'toLearn' or 'toDo");
    }
});


app.get("/books", (req: Request, res: Response) => {
    res.send(books);
});

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!!!" });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

