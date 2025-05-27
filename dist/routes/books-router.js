"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = require("express");
exports.booksRouter = (0, express_1.Router)();
const books = [{
        id: 1,
        volume: 'Book1'
    }, {
        id: 2,
        volume: 'Book2'
    }];
exports.booksRouter.get("/", (req, res) => {
    console.log(books);
    res.send(books);
});
exports.booksRouter.post("/", (req, res) => {
    const { id, volume } = req.body; // Приведение типа
    const newBook = { id: 3, volume };
    books.push(newBook);
    res.status(201).json(newBook);
});
exports.booksRouter.delete("/:id", (req, res) => {
    let currentBook = books.find(el => el.id === Number(req.params.id));
    if (currentBook) {
        books.splice(books.indexOf(currentBook), 1);
        res.send(books);
    }
    else {
        res.status(404).json({ message: "Book Not Found" });
    }
});
