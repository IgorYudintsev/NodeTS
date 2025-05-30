import {v1} from "uuid";

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
        todolistId: "1",
        title: "Monday",
        tasks: [
            {taskId: "1", title: "HTML&CSS", isDone: true, priority: "high"},
            {taskId: "2", title: "JS", isDone: false, priority: "medium"}
        ],
    },
    {
        todolistId: "2",
        title: "Tuesday",
        tasks: [
            {taskId: "1", title: "HTML&CSS2", isDone: false, priority: "low"},
            {taskId: "2", title: "JS2", isDone: true, priority: "high"}
        ],
    }
]
export  const todosRepository={
    getTodos(){
        return todos;
    },

    postTodo( title: string) {
        const newTodoList: ObjectType = {
            todolistId: v1(),
            title: title.trim(),
            tasks: []
        };
        todos.push(newTodoList);
        return todos
    },

    postTask(todolistId:string, title: string,priority:"high" | "medium" | "low") {
        const newTask: TasksType = {
            taskId: v1(),
            title: title.trim(),
            isDone: false,
            priority: priority as "high" | "medium" | "low"
        };

        const currentTodoList = todos.find(el => el.todolistId === todolistId);
        if (currentTodoList) {
            currentTodoList.tasks.push(newTask);
            return newTask;
        }else{
            return null
        }
    },

    deleteTodo( id: string) {
        let currentTodo = todos.find(el => el.todolistId === id);
        if (currentTodo) {
            todos.splice(todos.indexOf(currentTodo), 1);
            return todos
        }
     },

    deleteTask(todolistID: string, taskID: string) {
        let currentTodo = todos.find(el => el.todolistId === todolistID);
        if (!currentTodo) {
            throw new Error("Todo Not Found");
        }

        let currentTask = currentTodo.tasks.find(el => el.taskId === taskID);
        if (!currentTask) {
            throw new Error("Task Not Found");
        }

        currentTodo.tasks.splice(currentTodo.tasks.indexOf(currentTask), 1);
        return todos;
    },

    putTodo(todolistID: string,title: string){
        const currentTodo = todos.find(el => el.todolistId === todolistID);
        if (currentTodo) {
            currentTodo.title = title.trim();
            return todos
        }
    },

    putTask(todolistID: string, taskID: string, title: string) {
        const currentTodo = todos.find(el => el.todolistId === todolistID);
        if (!currentTodo) {
            throw new Error("Todo Not Found");
        }

        const currentTask = currentTodo.tasks.find(el => el.taskId === taskID);
        if (!currentTask) {
            throw new Error("Task Not Found");
        }

        currentTask.title = title.trim();
        return todos;
    }
}