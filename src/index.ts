import express from "express";
import cors from "cors";
import { booksRouter } from "./routes/books-router";
import { todosRouter } from "./routes/todos-router";
import { runDb } from "./repositories/db";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!!!" });
});

app.use("/books", booksRouter);
app.use("/todos", todosRouter);

async function startApp() {
    await runDb();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startApp();


//------------------------------------------------------------

// import express, {NextFunction, Request, Response} from 'express';
// import cors from "cors";
// import {booksRouter} from "./routes/books-router";
// import {todosRouter} from "./routes/todos-router";
// import {client, runDb} from "./repositories/db";
// import {BookType} from "./repositories/booksRepositories";
//
//
//
// const app = express();
// const port = 3000;
// // const port = process.env.PORT || 5000;
// app.use(cors());// Включаем CORS, чтобы разрешить запросы с других доменов
// app.use(express.json());// Добавляем middleware для парсинга JSON тела которое приходит в post
//
//
// app.get("/", (req: Request, res: Response) => {
//     res.json({message: "Hello TypeScript!!!"});
// });
//
// app.use('/books',booksRouter)
// app.use('/todos',todosRouter)
//
// const currentDB=client.db('kiberRus')
// export  const currentCollection=currentDB.collection<BookType>('books')
//
// const startApp = async () => {
//     await runDb();
//     app.listen(port, () => {
//         console.log(`Example app listening on port: ${port}`);
//     });
// };
//
// startApp();
//
//
//
// // app.listen(port, () => {
// //     console.log(`Server running on http://localhost:${port}`);
// // });