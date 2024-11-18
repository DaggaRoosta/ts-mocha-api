import { Request, Response } from "express";
import Book from "./../book";

export let allBooks = (req: Request, res: Response) => {
    Book.find()
    .then((books) => {
        console.log("Found Book ID!");
        console.log(books);
        res.send(books);
    })
    .catch((err) => {
        console.log("GET All Error!");
        console.log(err);
        res.send("GET All Error! " + err.message);
    })
  };

  export let getBook = (req: Request, res: Response) => {
    Book.findById(req.params.id)
    .then((book) => {
        console.log(book);
        res.send(book);
    })
    .catch((err) => {
        console.log("GET By ID Error!");
        console.log(err);
        res.send("GET By ID Error! " + err.message);
    })
  };

  export let deleteBook = (req: Request, res: Response) => {
    Book.deleteOne({ _id: req.params.id })
    .then(() => {
        console.log("Successfully Deleted Book");
        res.send("Successfully Deleted Book");
    })
    .catch((err) => {
        console.log("DELETE Error!");
        console.log(err);
        res.send("DELETE Error! " + err.message);
    })
  };

  export let updateBook = (req: Request, res: Response) => {
    console.log(req.body);

    Book.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        var book = new Book(req.body);
        book._id = req.params.id;
        console.log("Successfully Updated Book");
        console.log(book);
        res.send(book);
    })
    .catch((err) => {
        console.log("PUT Update Book Error!");
        console.log(err);
        res.send("PUT Update Book Error! " + err.message);
    })
  };

  export let addBook = (req: Request, res: Response) => {
    var book = new Book(req.body);
    book.save()
    .then(() => {
        console.log("Successfully Added Book");
        console.log(book);
        res.send(book);
    })
    .catch((err) => {
        console.log("POST Add Book Error!");
        console.log(err);
        res.send("POST Add Book Error! " + err.message);
    })
  };