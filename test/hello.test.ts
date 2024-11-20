let chakram = require('../node_modules/chakram/lib/chakram.js')
const expect = chakram.expect;

describe("Successful Call to Hello World API", function () {

  let helloWorldApiCall: any; //should be ChakramResponse
  let apiBody: String;

  before("A GET request is sent to the Happy World endpoint", function () {
    helloWorldApiCall = chakram.get('http://localhost:3000/',{ json: false });
    return helloWorldApiCall.then(function(respObj) {
      apiBody = respObj.body
    })
  });

  it("should return 200 on success", function () {
    expect(helloWorldApiCall).to.have.status(200);
  });

  it("should contain a body consisting of a 'Hello World!' string", function () {
    expect(apiBody).to.equal("Hello World!");
  });
});

export {};
