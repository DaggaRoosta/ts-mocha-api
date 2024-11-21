import Book from '../src/book';
const { getRandomBook } = require('../util/randomBook.ts');
let chakram = require('../node_modules/chakram/lib/chakram.js');
const expect = chakram.expect;


describe("PUT 1: Successful Update of a Book", function () {
  let postResponse: any; //should be ChakramResponse
  let putResponse: any;  //should be ChakramResponse
  let getResponse: any;  //should be ChakramResponse
  let postResponseBody: Object;
  let bookId: String;
  let book1: InstanceType<typeof Book>
  let book2: InstanceType<typeof Book>

  before("A valid POST request is sent to the API endpoint", function () {
    book1 = getRandomBook();
    postResponse = chakram.post('http://localhost:3000/book/', book1);
    return postResponse.then(function(respObj: any) {
      postResponseBody = respObj.body;
      return postResponseBody;
    })
    .then(function(book: InstanceType<typeof Book>) {
      bookId = book._id as String;
      book2 = getRandomBook();
      let editTitleBody = {
        "title": book2.title,
        "author": book1.author
      }
      putResponse = chakram.put('http://localhost:3000/book/' + bookId, editTitleBody);
      return putResponse;
    })
    .then(function() {
      getResponse = chakram.get('http://localhost:3000/book/' + bookId);
      return getResponse;
    })
  });

  it("PUT 1a: The API should respond with a 200 OK status code", function () {
    expect(putResponse).to.have.status(200);
  });

  it("PUT 1b: The edited book should have an updated title", function () {
    expect(getResponse).to.have.json("title", book2.title);
  });

  it("PUT 1c: The edited book should have the original author", function () {
    expect(getResponse).to.have.json("author", book1.author);
  });
});

describe("PUT 2: Attempted Update of a Non-Existent Book", function () {
  this.timeout(500000000);
  let putResponse: any;  //should be ChakramResponse
  let bookId: String;

  before("A valid POST request is submitted with an invalid ID", function () {
    let book = {"title": "Nada", "author": "Nada Dada"};
    bookId = "121212121212121212121212";
    putResponse = chakram.put('http://localhost:3000/book/' + bookId, book);
    return putResponse;
  });

  it("PUT 2a: The API should respond with a 404 Not Found status code", function () {
    expect(putResponse).to.have.status(404);
  });

});

describe("PUT 3: Attempted Update of a Book to Remove Required Fields", function () {
  this.timeout(500000000);
  let postResponse: any; //should be ChakramResponse
  let putResponse: any;  //should be ChakramResponse
  let postResponseBody: Object;
  let putResponseBody: Object;
  let bookId: String;
  let book1: InstanceType<typeof Book>

  before("A invalid POST request is sent to the API endpoint", function () {
    book1 = getRandomBook();
    postResponse = chakram.post('http://localhost:3000/book/', book1);
    return postResponse.then(function(respObj: any) {
      postResponseBody = respObj.body;
      return postResponseBody;
    })
    .then(function(book: InstanceType<typeof Book>) {
      bookId = book._id as String;
      let book2 = {'title': '', 'author': ''};
      putResponse = chakram.put('http://localhost:3000/book/' + bookId, book2);
      return putResponse;
    })
    .then(function(respObj: any) {
      putResponseBody = respObj.body
    })
  });

  it("PUT 3a: The API should respond with a 400 Bad Request status code", function () {
    expect(putResponse).to.have.status(400);
  });

  it("PUT 3b: The response should include an error message indicating the missing fields", function () {
    expect(putResponseBody).to.have.string("Path `title` is required");
    expect(putResponseBody).to.have.string("Path `author` is required");
  });

});

export {};
