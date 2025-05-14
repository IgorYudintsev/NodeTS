import express,{Request,Response} from 'express';
import cors from "cors";
const app = express();
const port = 3000;


// Включаем CORS, чтобы разрешить запросы с других доменов
app.use(cors());

app.get('/', (req:Request, res:Response) => {
    res.send('Hello TypeScript!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

