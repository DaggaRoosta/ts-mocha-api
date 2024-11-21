let { IBook } = require('../src/book');
type Book = typeof IBook;
let chakram = require('../node_modules/chakram/lib/chakram.js');
let typescript = require("typescript");
let JsonSourceFile = typescript.JsonSourceFile;
const jsonData: InstanceType<typeof JsonSourceFile> = require("./librarySource.json");
const values: InstanceType<typeof Object> = Object.values(jsonData)

export function getRandomBook(data: Object = values): Book {
    const randomValue: Book = data[Math.floor(Math.random() * 100)]
    return randomValue;
}

export async function populateLibrary(): Promise<void> {
    let book: Book;
    for (let i = 0; i < 3; i++) { 
        book = getRandomBook() as Book;
        await chakram.post('http://localhost:3000/book/', book);
    }
}


export async function tearDownLibrary(): Promise<void> {
    await chakram.delete('http://localhost:3000/books/');
}

