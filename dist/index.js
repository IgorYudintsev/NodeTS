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
exports.currentCollection = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_router_1 = require("./routes/books-router");
const todos_router_1 = require("./routes/todos-router");
const db_1 = require("./repositories/db");
const app = (0, express_1.default)();
const port = 3000;
// const port = process.env.PORT || 5000;
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
app.use(express_1.default.json()); // Добавляем middleware для парсинга JSON тела которое приходит в post
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!!!" });
});
app.use('/books', books_router_1.booksRouter);
app.use('/todos', todos_router_1.todosRouter);
const currentDB = db_1.client.db('books');
exports.currentCollection = currentDB.collection('books');
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`);
    });
});
startApp();
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
