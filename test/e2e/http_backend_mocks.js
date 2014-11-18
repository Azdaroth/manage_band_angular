// from https://github.com/petermajor/ProtractorWithoutBackend/blob/master/tests/web/restaurant/httpBackEndMocks.js

function passThrough($httpBackend) {
  $httpBackend.whenGET(/^\/scripts\//).passThrough();
};

module.exports.build = function(funcs) {
  var funcStr = "angular.module('httpBackEndMock', ['ngMockE2E'])";

  if (Array.isArray(funcs)) {
    for (var i = 0; i < funcs.length; i++) {
      funcStr += "\r.run(" + funcs[i] + ")"
    };
  } else {
    funcStr += "\r.run(" + funcs + ")"
  }

  funcStr += "\r.run(" + passThrough + ")";

  var funcTyped = Function(funcStr);

  return funcTyped;
}