import  {Request, Response, Router} from "express";
import {v1} from "uuid";
export const todosRouter = Router()

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

todosRouter.get("/", (req: Request, res: Response) => {
    if (!todos || todos.length === 0) {
        res.status(404).send("No todos found");
    } else {
        res.send(todos);
    }
});

todosRouter.post("/task", (req: Request, res: Response) => {
    try {
        // Валидация
        if (!req.body) {
            res.status(400).json({error: "Request body is missing"});
            return;
        }

        const {todolistId, title, priority = "medium"} = req.body;

        if (!todolistId) {
            res.status(400).json({error: "Todolist ID is required"});
            return;
        }

        if (!title?.trim()) {
            res.status(400).json({error: "Title is required"});
            return;
        }

        const validPriorities = ["high", "medium", "low"];
        if (priority && !validPriorities.includes(priority)) {
            res.status(400).json({error: "Invalid priority value"});
            return;
        }

        // Создание нового списка
        const newTask: TasksType = {
            taskId: v1(),
            title: title.trim(),
            isDone: false,
            priority: priority as "high" | "medium" | "low"
        };

        // Находим нужный todolist и добавляем задачу
        const todoList = todos.find(el => el.todolistId === todolistId);

        if (!todoList) {
            res.status(404).json({error: "Todolist not found"});
            return;
        }

        todoList.tasks.push(newTask);
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

todosRouter.delete("/:id", (req: Request, res: Response) => {
    let currentTodo = todos.find(el => el.todolistId === req.params.id);
    if (currentTodo) {
        todos.splice(todos.indexOf(currentTodo), 1);
        res.send(todos);
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

todosRouter.delete("/:todolistID/tasks/:taskID", (req: Request, res: Response) => {
    let currentTodo = todos.find(el => el.todolistId === req.params.todolistID);
    if (currentTodo) {
        let currentTask = currentTodo.tasks.find(el => el.taskId === req.params.taskID)
        if (currentTask) {
            currentTodo.tasks.splice(currentTodo.tasks.indexOf(currentTask), 1);
            res.send(todos);
        } else {
            res.status(404).json({message: "Task Not Found"});
        }
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

todosRouter.put("/:id", (req: Request, res: Response) => {
    try {
        if (!req.body) {
            res.status(400).json({error: "Request body is missing"});
            return;
        }

        const {title} = req.body;

        if (!title?.trim()) {
            res.status(400).json({error: "Title is required"});
            return;
        }

        const currentTodo = todos.find(el => el.todolistId === req.params.id);

        if (currentTodo) {
            currentTodo.title = title.trim();
            res.status(200).json(todos);
        } else {
            res.status(404).json({message: "Todo Not Found"});
        }

    } catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

todosRouter.put("/:todolistID/tasks/:taskID", (req: Request, res: Response) => {
    try {
        if (!req.body) {
            res.status(400).json({error: "Request body is missing"});
            return;
        }

        const {title} = req.body;
        if (!title?.trim()) {
            res.status(400).json({error: "Title is required"});
            return;
        }
        const currentTodo = todos.find(el => el.todolistId === req.params.todolistID);

        if (currentTodo) {
            let currentTask = currentTodo.tasks.find(el => el.taskId === req.params.taskID)
            if (currentTask) {
                currentTask.title = title.trim();
                res.status(200).json(todos);
            } else {
                res.status(404).json({message: "Task Not Found"});
            }
        } else {
            res.status(404).json({message: "Todo Not Found"});
        }

    } catch (error) {
        console.error("Error updating todo list:", error);
        res.status(500).json({error: "Internal server error"});
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
