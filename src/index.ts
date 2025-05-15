import express,{Request,Response} from 'express';
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());// Включаем CORS, чтобы разрешить запросы с других доменов

const todos=[{title:'Express'},{title:'React'}]
const books=[{volume:'Book1'},{volume:'Book2'}]

app.get("/todos", (req: Request, res: Response) => {
    res.send(todos);
});

app.get("/books", (req: Request, res: Response) => {
    res.send(books);
});

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello TypeScript!" });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

