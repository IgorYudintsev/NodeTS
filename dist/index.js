"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_router_1 = require("./routes/books-router");
const todos_router_1 = require("./routes/todos-router");
const db_1 = require("./repositories/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!!!" });
});
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // 204 No Content — ответ без содержимого
});
app.use("/books", books_router_1.booksRouter);
app.use("/todos", todos_router_1.todosRouter);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.runDb)();
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
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
