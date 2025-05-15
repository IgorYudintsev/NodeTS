"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)()); // Включаем CORS, чтобы разрешить запросы с других доменов
const todos = [{ title: 'Express' }, { title: 'React' }];
const books = [{ volume: 'Book1' }, { volume: 'Book2' }];
app.get("/todos", (req, res) => {
    res.send(todos);
});
app.get("/books", (req, res) => {
    res.send(books);
});
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!!" });
});
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
});
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
