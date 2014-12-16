'use strict';

describe('Directive: assetList', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      AssetList,
      assetList,
      band;

  band = { id: 100 };
  assetList = {  name: "name" };

  beforeEach(inject(function ($rootScope, $compile, _AssetList_) {
    scope = $rootScope.$new();
    element = angular.element('<asset-list band="band" asset-list="assetList"></asset-list>');
    element = $compile(element)(scope);
    scope.band = band;
    scope.assetList = assetList;
    scope.$digest();
    AssetList = _AssetList_;
    spyOn(AssetList, 'update')
  }));

  it('calls AssetList service with update method', function () {
    element.isolateScope().updateAssetListName("new name");
    expect(AssetList.update).toHaveBeenCalledWith(band, assetList, { name: "new name" });
  });
});
