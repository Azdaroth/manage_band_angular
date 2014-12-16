'use strict';

describe('Service: AssetList', function () {

  // load the service's module
  beforeEach(module('manageBandApp'));

  // instantiate service
  var AssetList, httpBackend;
  beforeEach(inject(function (_AssetList_, _$httpBackend_) {
    AssetList = _AssetList_;
    httpBackend = _$httpBackend_;
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands/1/asset_lists.json')
      .respond( { asset_lists: [ { id: "10" }, { id: "2" } ] } );
    httpBackend.when('POST', 'http://manage_band.dev/api/v1/bands/1/asset_lists.json',
      { asset_list: { name: "name" } }).respond("created");
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands/1/asset_lists/10.json')
      .respond( { asset_lists: { id: "10" } } );
    httpBackend.when('PATCH', 'http://manage_band.dev/api/v1/bands/1/asset_lists/10.json')
      .respond("updated");
  }));

  var band = {
    id: "1"
  };

  describe("all", function() {
    it("makes call to api to get all assetlists for band", function() {
      AssetList.all(band).then(function(assetLists) {
        expect(assetLists.length).toEqual(2);
        expect(assetLists[0].id).toEqual("10")
        expect(assetLists[1].id).toEqual("2")
      });
      httpBackend.flush();
    });
  });

  describe("find", function() {
    it("makes call to api to get assetlist in band by id", function() {
      AssetList.find(band, "10").then(function(assetList) {
        expect(assetList.id).toEqual("10")
      });
      httpBackend.flush();
    });
  });

  describe("create", function() {
    it("makes call to api to create assetlist in band", function() {
      AssetList.create(band, { name: "name" }).then(function(response) {
        expect(response).toEqual("created");
      });
      httpBackend.flush();
    });
  });

  describe("update", function() {
    it("makes call to api to update assetlist in band with params", function() {
      var assetList = { id: "10" }
      AssetList.update(band, assetList, { name: "name" }).then(function(response) {
        expect(response).toEqual("updated");
      });
      httpBackend.flush();
    });
  });

});
