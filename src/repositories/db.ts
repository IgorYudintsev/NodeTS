
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const client = new MongoClient(mongoURI);


import { Collection } from "mongodb";
import { BookType } from "./booksRepositories";

const currentDB = client.db("kiberRus");
export const currentCollection: Collection<BookType> = currentDB.collection<BookType>("books");



export async function runDb() {
    try {
        await client.connect();
        await client.db("books").command({ ping: 1 });
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.error("Connection failed:", error);
        await client.close();
        process.exit(1);
    }
}

// // Добавим экспорт коллекции здесь, чтобы избежать циклических зависимостей
// const currentDB = client.db("kiberRus");  // База данных, которую используешь в основном коде
// export const currentCollection = currentDB.collection("books");



//----------------------------------------------------
// import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';
// dotenv.config();
//
// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
// export const client = new MongoClient(mongoURI);
//
//
// export async function runDb() {
//     try {
//         await client.connect();
//         await client.db("books").command({ ping: 1 });
//         console.log("Connected successfully to MongoDB");
//     } catch (error) {
//         console.error("Connection failed:", error);
//         await client.close();
//         process.exit(1); // Завершить процесс при ошибке (опционально)
//     }
// }