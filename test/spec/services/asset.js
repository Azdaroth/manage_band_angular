'use strict';

describe('Service: Asset', function () {

  // load the service's module
  beforeEach(module('manageBandApp'));

  // instantiate service
  var Asset, httpBackend;
  beforeEach(inject(function (_Asset_, _$httpBackend_) {
    Asset = _Asset_;
    httpBackend = _$httpBackend_;
    httpBackend.when('POST', 'http://manage_band.dev/api/v1/bands/1/asset_lists/2/assets.json',
      { asset: { name: "name" } }).respond("created");
    httpBackend.when('POST', 'http://manage_band.dev/api/v1/bands/1/asset_lists/2/assets/link.json',
      { assets_tree: { name: "link" } }).respond("linked");
  }));

  var band = {
    id: "1"
  }

  var assetList = {
    id: "2"
  }

  describe("create", function() {
    it("makes call to api to create asset in assetlist in band", function() {
      Asset.create(band, assetList, { name: "name" }).then(function(response) {
        expect(response).toEqual("created");
      });
      httpBackend.flush();
    });
  });

  describe("link", function() {
    it("makes call to api to link assets from tree structure in assetlist in band", function() {
      Asset.link(band, assetList, { name: "link" }).then(function(response) {
        expect(response).toEqual("linked");
      });
      httpBackend.flush();
    });
  });

});
