import {client} from "./db";
import {ObjectId} from "mongodb";
import {currentCollection} from "../index";

export type BookType={
    id: number,
    volume: string
}

// const books:BookType[] = [{
//     id: 1,
//     volume: 'Book1'
// }, {
//     id: 2,
//     volume: 'Book2'
// }]

// const currentDB=client.db('books').collection<BookType>('books')

export  const booksDBRepository={

      async  getBooks():Promise<BookType[]> {
          return await  currentCollection.find().toArray();
          },


    async postBooks(volume: string): Promise<BookType> {
        const newBook = { id: Math.floor(Math.random() * 10000), volume };
        const result = await currentCollection.insertOne(newBook);
        const insertedBook = await currentCollection.findOne({ _id: result.insertedId });
        if (!insertedBook) {
            throw new Error("Ошибка: документ не найден после вставки");
        }
        return insertedBook;
    },

   async deleteBooks( id: string):Promise<BookType[]> {
          const result = await currentCollection.deleteOne({ id: Number(id) });

       if (result.deletedCount === 0) {
           throw new Error("Книга с таким _id не найдена");
       }

       return await currentCollection.find().toArray();
   }
 }