'use strict';

describe('Service: Asset', function () {

  // load the service's module
  beforeEach(module('manageBandApp'));

  var band = {
    id: "1"
  };

  var assetList = {
    id: "2"
  };

  var asset = {
    id: "3"
  };

  // instantiate service
  var Asset, httpBackend;
  beforeEach(inject(function (_Asset_, _$httpBackend_) {
    Asset = _Asset_;
    httpBackend = _$httpBackend_;
    httpBackend.when('POST', 'http://manage_band.dev/api/v1/bands/1/asset_lists/2/assets.json',
      { asset: { name: "name" } }).respond("created");
    httpBackend.when('POST', 'http://manage_band.dev/api/v1/bands/1/asset_lists/2/assets/link.json',
      { assets_tree: { name: "link" } }).respond("linked");
    httpBackend.when('PATCH', 'http://manage_band.dev/api/v1/bands/1/asset_lists/2/assets/3.json',
      { asset: { name: "name" } }).respond("updated");
    httpBackend.when('GET', 'http://manage_band.dev/api/v1/bands/1/asset_lists/2/assets/3.json')
      .respond({ assets: asset } );
    httpBackend.when('DELETE', 'http://manage_band.dev/api/v1/bands/1/asset_lists/2/assets/3.json')
      .respond("destroyed");
  }));

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

  describe("update", function() {
    it("makes call to api to update asset in assetlist in band", function() {
      Asset.update(band, assetList, asset, { name: "name" }).then(function(response) {
        expect(response).toEqual("updated");
      });
      httpBackend.flush();
    });
  });

  describe("find", function() {
    it("makes call to api to find asset by id in assetlist in band", function() {
      Asset.find(band, assetList, "3").then(function(response) {
        expect(response.id).toEqual(asset.id);
      });
      httpBackend.flush();
    });
  });

  describe("destroy", function() {
    it("makes call to api to destroy asset in assetlist in band", function() {
      Asset.destroy(band, assetList, asset).then(function(response) {
        expect(response).toEqual("destroyed");
      });
      httpBackend.flush();
    });
  });

});
