import express, {NextFunction, Request, Response} from 'express';
import cors from "cors";
import {booksRouter} from "./routes/books-router";
import {todosRouter} from "./routes/todos-router";


const app = express();
const port = 3000;
app.use(cors());// Включаем CORS, чтобы разрешить запросы с других доменов
app.use(express.json());// Добавляем middleware для парсинга JSON тела которое приходит в post


app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello TypeScript!!!"});
});


app.use('/books',booksRouter)
app.use('/todos',todosRouter)



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});