'use strict';

describe('Directive: createAssetList', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      newAssetList,
      band,
      assetLists,
      AssetList;

  newAssetList = {
    name: '',
    assets: []
  };

  band = {}

  assetLists = [];

  beforeEach(inject(function ($rootScope, $compile, _AssetList_) {
    scope = $rootScope.$new();
    AssetList = _AssetList_;
    spyOn(AssetList, 'create');
    element = angular.element('<create-asset-list asset-lists="assetLists" band="band"></create-asset-list>');
    element = $compile(element)(scope);
    scope.assetLists = assetLists;
    scope.newAssetList = newAssetList;
    scope.band = band;
    scope.$digest();
  }));

  it('addest list to asset lists', function() {
    element.isolateScope().createAssetList();
    expect(assetLists.length).toEqual(1);
  });

  it('calls AssetList service to create new asset list on backend', function() {
    element.isolateScope().createAssetList();
    expect(AssetList.create).toHaveBeenCalledWith(band, newAssetList);
  });
});
