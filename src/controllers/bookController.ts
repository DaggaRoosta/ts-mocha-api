import { Request, Response } from "express";
import Book from "./../book";

export let allBooks = (req: Request, res: Response) => {
    Book.find()
    .then((books) => {
        console.log("Found All Books!");
        console.log(books);
        res.status(200);
        res.send(books);
    })
    .catch((err) => {
        console.log("GET All Books Error!");
        console.log(err);
        res.status(404);
        res.send("GET All Books Error! " + err.message);
    })
  };

  export let getBook = (req: Request, res: Response) => {
    Book.findById(req.params.id)
    .then((book) => {
        if(!book) {
            console.log("GET Book By ID Error - ID Not Found");
            res.status(404);
            res.send("GET Book By ID Error - ID Not Found");
        } else {
            console.log("Successfully Retrieved Book");
            console.log(book);
            res.status(200);
            res.send(book);
        }
    })
    .catch((err) => {
    })
  };

  export let deleteBook = async (req: Request, res: Response) => {
    try {
        const deletedBook = await Book.deleteOne({ _id: req.params.id })
        console.log(deletedBook);
        if (!deletedBook.acknowledged || deletedBook.deletedCount != 1) {
            console.log("DELETE Book Error - Book Not Found!");
            res.status(404);
            res.send("DELETE Book Error - Book Not Found!");
        } else {
            console.log("Successfully Deleted Book ID: " + req.params.id);
            console.log(deletedBook);
            res.status(204);
            res.send(deletedBook);
        }
    } catch (err: any) {
        console.log("DELETE Book Error - Invalid ID!");
        console.log(err);
        res.status(400);
        res.send("DELETE Book Error - Invalid ID! " + err.message);

    };
  };

  export let deleteAllBooks = (req: Request, res: Response) => {
    Book.deleteMany({})
    .then(() => {
        console.log("Successfully Deleted All Books!");
        res.status(204);
        res.send("Successfully Deleted All Books!");
    })
    .catch((err) => {
        console.log("DELETE All Books Error!");
        console.log(err);
        res.status(500);
        res.send("DELETE All Books Error! " + err.message);
    })
  };

  export let updateBook = async (req: Request, res: Response) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            console.log("PUT Update Book Error - Book Not Found!");
            res.status(404);
            res.send("PUT Update Book Error - Book Not Found!");
        } else {
            console.log("Updated Book:");
            console.log(updatedBook);
            console.log("Successfully Updated Book");
            console.log(req.body);
            res.status(200);
            res.send(updatedBook);
        }
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            console.log("PUT Update Book Error - Required Fields Missing!");
            console.log(err);
            res.status(400);
            res.send("PUT Update Book Error - Required Fields Missing! " + err.message);
        } 
        else throw(err);
    };
  };

  export let addBook = (req: Request, res: Response) => {
    var book = new Book(req.body);
    book.save()
    .then(() => {
        console.log("Successfully Added Book");
        console.log(book);
        res.status(201);
        res.send(book);
    })
    .catch((err) => {
        console.log("POST Add Book Error!");
        console.log(err);
        res.status(400);
        res.send("POST Add Book Error! " + err.message);
    })
  };