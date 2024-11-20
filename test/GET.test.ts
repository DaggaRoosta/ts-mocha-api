import Book from '../src/book';
import { deleteBook } from '../src/controllers/bookController';
const { getRandomBook } = require('../util/randomBook.ts');
let chakram = require('../node_modules/chakram/lib/chakram.js');
const expect = chakram.expect;


describe('Successful Deletion of a Book', function () {
  let postResponse: any;        //should be ChakramResponse
  let deleteResponse: any;      //should be ChakramResponse
  let afterDeleteResponse: any; //should be ChakramResponse
  let postResponseBody: Object[];
  let afterDeleteResponseBody: Object[];
  let bookId: String;

  before('A DELETE request is sent to the API endpoint with the specified ID', function () {  
    let book = getRandomBook();
    postResponse = chakram.post('http://localhost:3000/book/', book);
    return postResponse.then(function(getRespObj: any) {
      postResponseBody = getRespObj.body;
      return postResponseBody;
    })
    .then(function(book: InstanceType<typeof Book>) {
      bookId = book._id as String;
      deleteResponse = chakram.delete('http://localhost:3000/book/' + bookId);
      return;
    })
    .then(function() {
      afterDeleteResponse = chakram.get('http://localhost:3000/books');
      return afterDeleteResponse;
    })
    .then(function(aftRespBody: any) {
      afterDeleteResponseBody = aftRespBody.body;
    })
  });

  it('The API should respond with a 204 No Content status code', function () {
    expect(deleteResponse).to.have.status(204);
  });

  it('The book should be deleted', function () {
    expect(afterDeleteResponseBody.map((e) => e['_id'])).to.not.include(bookId);
  });
});

describe("Delete Book with Bad ID", function () {
  let apiResponse: any; //should be ChakramResponse
  let responseBody: Object;

  before("A invalid DELETE request is sent to the API endpoint", function () {
    let bookId: String = "notarealbookid";
    apiResponse = chakram.delete('http://localhost:3000/book/' + bookId);
    return apiResponse.then(function(respObj) {
      responseBody = respObj.body
    })
  });

  it("The API should respond with a 404 Not Found status code", function () {
    expect(apiResponse).to.have.status(404);
  });
});

describe("Successful Deletion of All Books", function () {
  let postResponse: any;        //should be ChakramResponse
  let deleteResponse: any;      //should be ChakramResponse
  let afterDeleteResponse: any; //should be ChakramResponse
  let postResponseBody: Object[];
  let afterDeleteResponseBody: Object[];

  before("A valid DELETE request is sent to the API endpoint", function () {
    let book = getRandomBook();
    postResponse = chakram.post('http://localhost:3000/book/', book);
    return postResponse.then(function(getRespObj: any) {
      postResponseBody = getRespObj.body;
      return postResponseBody;
    })
    .then(function() {
      deleteResponse = chakram.delete('http://localhost:3000/books/');
      return deleteResponse;
    })
    .then(function() {
      afterDeleteResponse = chakram.get('http://localhost:3000/books');
      return afterDeleteResponse;
    })
    .then(function(aftRespBody: any) {
      afterDeleteResponseBody = aftRespBody.body;
    });
  });

  it("The API should respond with a 204 No Content status code", function () {
    expect(deleteResponse).to.have.status(204);
  });

  it("The response should include the ID of the newly created book", function () {
    expect(afterDeleteResponseBody.length).to.equal(0);
  });
});

export {};
