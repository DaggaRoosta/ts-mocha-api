let { IBook } = require('../src/book');
type Book = typeof IBook;
const { getRandomBook, 
        populateLibrary, 
        tearDownLibrary } = require('../util/libraryUtils.ts');
let chakram = require('../node_modules/chakram/lib/chakram.js');
const expect = chakram.expect;


describe('GET 1: Successful Retrieval of a Book', function () {
  let postResponse: any; //should be ChakramResponse
  let getResponse: any;  //should be ChakramResponse
  let postResponseBody: Object[];
  let getResponseBody: Object[];
  let bookId: String;
  let book: Book;

  before('A GET request is sent to the API endpoint with the specified ID', async function () {
    await populateLibrary();
    book = getRandomBook();
    postResponse = chakram.post('http://localhost:3000/book/', book);
    return postResponse.then(function(getRespObj: any) {
      postResponseBody = getRespObj.body;
      return postResponseBody;
    })
    .then(function(book: Book) {
      bookId = book._id as String;
      getResponse = chakram.get('http://localhost:3000/book/' + bookId);
      return getResponse;
    })
    .then(function(respBody: any) {
      getResponseBody = respBody.body;
    })
  });

  it('GET 1a: The API should respond with a 200 OK status code', function () {
    expect(getResponse).to.have.status(200);
  });

  it('GET 1b: The response should include the details of the requested book', function () {
    expect(getResponse).to.have.json("title", book.title);
    expect(getResponse).to.have.json("author", book.author);
  });

  after(async function() {
    await tearDownLibrary();
  });
});

describe("GET 2: Retrieve Book with Bad ID", function () {
  let apiResponse: any; //should be ChakramResponse
  let responseBody: Object;

  before("A invalid GET request is sent to the API endpoint", async function () {
    await populateLibrary();
    let bookId: String = "121212121212121212121212";
    apiResponse = chakram.get('http://localhost:3000/book/' + bookId);
    return apiResponse.then(function(respObj) {
      responseBody = respObj.body
    })
  });

  it("GET 2a: The API should respond with a 404 Not Found status code", function () {
    expect(apiResponse).to.have.status(404);
  });

  after(async function() {
    await tearDownLibrary();
  });
});

describe("GET 3: Successful Retrieval of All Books", function () {
  let getAllResponse: any; //should be ChakramResponse
  let getAllResponseBody: Object[];
  let libraryList: Book[] = [];
  let getAllList: Book[] = [];

  before("A valid GET request is sent to the API endpoint", async function () {
    await populateLibrary();
    chakram.delete('http://localhost:3000/books/');
    for (let i = 0; i < 3; i++) { 
      let book: Book = getRandomBook();
      await chakram.post('http://localhost:3000/book/', book);
      libraryList.push(book);
    }
    getAllResponse = chakram.get('http://localhost:3000/books/');
    return getAllResponse
    .then(function(getAllRespObj: any) {
      getAllResponseBody = getAllRespObj.body;
      getAllResponseBody.forEach((Object) => {
        let book = Object as Book;
        delete book['__v'];
        delete book['_id'];
        getAllList.push(book);
      })
    });
  });

  it("GET 3a: The API should respond with a 200 OK status code", function () {
    expect(getAllResponse).to.have.status(200);
  });

  it("GET 3b: The response should contain the entire library of books", function () {
    expect(getAllList.length).to.equal(libraryList.length);
    expect(getAllList).to.eql(libraryList);
  });

  after(async function() {
    await tearDownLibrary();
  });
});

export {};
