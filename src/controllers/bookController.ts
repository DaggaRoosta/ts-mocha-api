import { Request, Response } from "express";

export let allBooks = (req: Request, res: Response) => {
  res.send("Returns all Books");
};

export let getBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let deleteBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let updateBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let addBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};