'use strict';

/**
 * @ngdoc overview
 * @name manageBandApp
 * @description
 * # manageBandApp
 *
 * Main module of the application.
 */


angular
  .module('manageBandApp', [
    'manageBand.config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ng-token-auth',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'restangular',
    'ng-nestable',
    'angularFileUpload',
    'ui.calendar',
    'ui.sortable',
    'xeditable',
    'ui.bootstrap',
    'ngTagsInput'
  ])
  .config(function($authProvider, ENV) {
    $authProvider.configure({
      apiUrl: ENV.basePath
    });
  })
  .config(function(RestangularProvider, ENV) {
    RestangularProvider.setBaseUrl(ENV.apiEndpoint);
    RestangularProvider.setRequestSuffix('.json');

    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
      if (operation === 'getList' || operation === 'get') {
        var rootEl = Object.keys(data)[0];
        return data[rootEl];
      } else {
        return data;
      }
    });

  })
  .config(function($nestableProvider) {
    $nestableProvider.defaultOptions({
      expandBtnHTML: '<button class="nestable-expand-btn" data-action="expand">Expand></button>',
      collapseBtnHTML: '<button class="nestable-collapse-btn" data-action="collapse">Collapse</button>'
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('signIn', {
        url: '/sign-in',
        templateUrl: 'views/sign_in.html',
        controller: 'SessionsCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegistrationsCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('band', {
        url: '/band/:bandId',
        templateUrl: 'views/band.html',
        controller: 'BandCtrl',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('band.asset', {
        url: '/asset-list/:assetListId/asset/:assetId',
        onEnter: function($modal, $state, $stateParams) {
          $modal.open({
            size: 'lg',
            controller: 'AssetCtrl',
            templateUrl: 'views/asset.html'
          }).result.then(function(result) {
            if (result) {
              return $state.transitionTo("band", { bandId: $stateParams.bandId });
            }
          });
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('band.newTask', {
        url: '/task-list/:taskListId/task/new',
        onEnter: function($modal, $state, $stateParams) {
          $modal.open({
            size: 'lg',
            controller: 'NewTaskCtrl',
            templateUrl: 'views/newtask.html'
          }).result.then(function(result) {
            if (result) {
              return $state.transitionTo("band", { bandId: $stateParams.bandId });
            }
          });
        },
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      });
  }).run(function($rootScope, flash) {
    $rootScope.logOut = function() {
      flash.success = "You have been logged out."
      $rootScope.signOut();
    };
  }).run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });