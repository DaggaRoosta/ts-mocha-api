import express, { Request, Response } from "express";
import * as bookController from "./controllers/bookController";

// Our Express APP config
const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3000);

// Home API Endpoint
app.get("/", (req: Request, res: Response) => { 
    res.send("Hello World!") 
    console.log("Hello World! response sent") 
});

// Book API Endpoints
app.get("/books", bookController.allBooks);
app.get("/book/:id", bookController.getBook);
app.post("/book", bookController.addBook);
app.put("/book/:id", bookController.updateBook);
app.delete("/book/:id", bookController.deleteBook);
app.delete("/books/", bookController.deleteAllBooks);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});