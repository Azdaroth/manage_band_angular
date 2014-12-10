'use strict';

describe('Service: Band', function () {

  // load the service's module
  beforeEach(module('manageBandApp'));

  // instantiate service
  var Band, httpBackend;
  beforeEach(inject(function (_Band_, _$httpBackend_) {
    Band = _Band_;
    httpBackend = _$httpBackend_;
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands.json')
      .respond( { bands: [ { id: "1" }, { id: "2" } ] } );
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands/1.json')
      .respond( { bands: { id: "1" } } );
  }));

  describe("all", function() {
    it("makes call to api to get all bands", function() {
      Band.all().then(function(bands) {
        expect(bands.length).toEqual(2);
        expect(bands[0].id).toEqual("1")
        expect(bands[1].id).toEqual("2")
      });
      httpBackend.flush();
    });
  });

   describe("find", function() {
    it("makes call to api to get band by id", function() {
      Band.find("1").then(function(band) {
        httpBackend.flush();
        expect(band.id).toEqual("1")
      });
    });
  });

});
