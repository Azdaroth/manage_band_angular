'use strict';

describe('Directive: asset', function () {

  // load the directive's module
  beforeEach(module('manageBandApp'));

  var element,
      scope,
      band,
      asset,
      assetList,
      Asset;

  band = { name: "band" };

  assetList = { name: "assetList" };

  asset = { name: "asset" };

  beforeEach(inject(function ($rootScope, $compile, _Asset_) {
    scope = $rootScope.$new();
    element = angular.element('<asset band="band" asset-list="assetList" asset="asset"></asset>');
    element = $compile(element)(scope);
    Asset = _Asset_;
    spyOn(Asset, 'update');
    scope.band = band;
    scope.assetList = assetList;
    scope.asset = asset;
    scope.$digest();
  }));

  it('calls Asset service with update methodidden element visible', function () {
    element.isolateScope().updateAssetName("new name");
    expect(Asset.update).toHaveBeenCalledWith(band, assetList, asset, { name: "new name" });
  });
});
