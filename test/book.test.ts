var chakram = require('../node_modules/chakram/lib/chakram.js')
const expect = chakram.expect;

describe("add book ID, then delete it", function () {
  it("chakram, chai assertions, and API are working", function () {
      expect(1).to.be.below(10);
      expect("teststring").to.be.a('string');
      expect(true).to.be.true;
      var apiCall = chakram.get("http://localhost:3000/");
      expect(apiCall).to.have.status(200);
      return chakram.wait();
  });
    it("should support sequential API interaction", function () {
      var artist = "Notorious B.I.G.";
      return chakram.get("http://localhost:3000/books")
      .then(function (searchResponse) {
        var bigID = searchResponse.body;

        return chakram.get("https://api.spotify.com/v1/artists/"+bigID+"/top-tracks?country=GB");
      })
      .then(function (topTrackResponse) {
        var topTrack = topTrackResponse.body.tracks[0];
        expect(topTrack.name).to.contain("Old Thing Back");
      });
    });
  });
 