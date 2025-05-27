import  {Request, Response, Router} from "express";
export const booksRouter = Router()

const books = [{
    id: 1,
    volume: 'Book1'
}, {
    id: 2,
    volume: 'Book2'
}]

booksRouter.get("/", (req: Request, res: Response) => {
    console.log(books)
    res.send(books);
});

booksRouter.post("/", (req: Request, res: Response) => {
    const {id, volume} = req.body as { id: string, volume: string }; // Приведение типа
    const newBook = {id: 3, volume};
    books.push(newBook);
    res.status(201).json(newBook);
});

booksRouter.delete("/:id", (req: Request, res: Response) => {
    let currentBook = books.find(el => el.id === Number(req.params.id));
    if (currentBook) {
        books.splice(books.indexOf(currentBook), 1);
        res.send(books);
    } else {
        res.status(404).json({message: "Book Not Found"});
    }
});