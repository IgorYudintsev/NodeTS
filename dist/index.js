"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// Включаем CORS, чтобы разрешить запросы с других доменов
app.use((0, cors_1.default)());
// app.get('/', (req:Request, res:Response) => {
//     res.send('Hello TypeScript!');
// });
app.get("/", (req, res) => {
    res.json({ message: "Hello TypeScript!" }); // JSON, а не просто текст
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
