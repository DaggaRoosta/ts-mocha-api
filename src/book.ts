import * as mongoose from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/local";

mongoose.connect(uri)
.then(() => {;
    console.log("Successfully Connected to MongoDB!")
    console.log("URI: " + uri)
})
.catch((err) => {
    console.log("POST Error!");
    console.log(err.message);
})

export interface IBook extends mongoose.Document {
  title: string;
  author: number;
}

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
