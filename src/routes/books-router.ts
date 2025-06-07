import express, {Request, Response, Router} from "express";
// import {booksRepository, BookType} from "../repositories/books-repositories";
export const booksRouter = Router()

const app = express();
import {body, param, query, validationResult} from 'express-validator';
// import {booksDBRepository, BookType} from "../repositories/booksDB-repositories";
import { booksDBRepositories, BookType } from "../repositories/booksDB-repositories";

import {booksRepository} from "../repositories/books-repositories";
// import {booksRepository} from "../repositories/books-repositories";
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // для парсинга URL-encoded тела запроса

booksRouter.get("/", async (req: Request, res: Response) => {
    const foundBooks: BookType[] = await booksDBRepositories.getBooks()
    res.send(foundBooks);
});

booksRouter.post("/",
    body('volume').isLength({min:3, max:30}),
    async(req: Request, res: Response) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: "Invalid volume: min:1, max:30" });
        }

    const { volume} = req.body as {  volume: string };
    const newBookPromise:BookType= await booksDBRepositories.postBooks(volume)
    res.status(201).json(newBookPromise);
});


booksRouter.delete("/:id", async (req: Request, res: Response) => {
    let currentBook = await booksDBRepositories.deleteBooks(req.params.id)
    if (currentBook) {
             res.send(currentBook);
    } else {
        res.status(404).json({message: "Book Not Found"});
    }
});