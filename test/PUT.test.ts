const { getRandomBook } = require('../util/randomBook.ts');
let chakram = require('../node_modules/chakram/lib/chakram.js');
const expect = chakram.expect;


describe("Successful Addition of a Book", function () {
  let bookResponse: any; //should be ChakramResponse
  let responseBody: Object;

  before("A valid POST request is sent to the API endpoint", function () {
    let book = getRandomBook();
    bookResponse = chakram.post('http://localhost:3000/book/', book);
    return bookResponse.then(function(respObj) {
      responseBody = respObj.body
    })
  });

  it("The API should respond with a 201 Created status code", function () {
    expect(bookResponse).to.have.status(201);
  });

  it("The response should be JSON that includes all required fields", function () {
    expect(responseBody).to.include.all.keys("title", "author");
  });

  it("The response should include the ID of the newly created book", function () {
    expect(responseBody).to.include.key("_id");
  });
});

describe("Add Book with Missing Required Fields", function () {
  this.timeout(500000000);
  let apiResponse: any; //should be ChakramResponse
  let responseBody: Object;

  before("A invalid POST request is sent to the API endpoint", function () {
    let book = {"badtitle": "Nada", "badauthor": "Nada Dada"};
    apiResponse = chakram.post('http://localhost:3000/book/', book);
    return apiResponse.then(function(respObj) {
      responseBody = respObj.body
    })
  });

  it("The API should respond with a 400 Bad Request status code", function () {
    expect(apiResponse).to.have.status(400);
  });

  it("The response should include an error message indicating the missing fields", function () {
    expect(responseBody).to.have.string("Path `title` is required");
    expect(responseBody).to.have.string("Path `author` is required");
  });

});

  export {};