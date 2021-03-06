/**
 * Angular nestable 0.0.1
 * Copyright (c) 2014 Kamil Pekala
 * https://github.com/kamilkp/ng-nestable
 */

/**
 * Sample output HTML
  <div class="dd">
    <ol class="dd-list">
      <li class="dd-item" data-id="1">
        <!-- item element -->
      </li>
      <li class="dd-item" data-id="2">
        <!-- item element -->
      </li>
      <li class="dd-item" data-id="3">
        <!-- item element -->
        <ol class="dd-list">
          <li class="dd-item" data-id="4">
            <!-- item element -->
          </li>
          <li class="dd-item" data-id="5">
            <!-- item element -->
          </li>
        </ol>
      </li>
    </ol>
  </div>
 */

/**
 * Sample model object
  [
    {
      item: {},
      children: []
    },
    {
      item: {},
      children: [
        {
          item: {},
          children: []
        }
      ]
    },
    {
      item: {},
      children: []
    }
  ]
 */

;(function(window, document, angular, undefined){
  angular.module('ng-nestable', [])
    .provider('$nestable', function(){
      var modelName = '$item';
      var defaultOptions = {};

      this.$get = function(){
        return {
          modelName: modelName,
          defaultOptions: defaultOptions
        };
      };

      /**
       * Method to set model variable for nestable elements
       * @param  {[string]} value
       */
      this.modelName = function(value){
        modelName = value;
      };

      /**
       * Method to set default nestable options
       * @param  {[object]} value
       * You can change the follow options:

        maxDepth        : number of levels an item can be nested (default 5)
        group           : group ID to allow dragging between lists (default 0)

        listNodeName    : The HTML element to create for lists (default 'ol')
        itemNodeName    : The HTML element to create for list items (default 'li')
        rootClass       : The class of the root element .nestable() was used on (default 'dd')
        listClass       : The class of all list elements (default 'dd-list')
        itemClass       : The class of all list item elements (default 'dd-item')
        dragClass       : The class applied to the list element that is being dragged (default 'dd-dragel')
        handleClass     : The class of the content element inside each list item (default 'dd-handle')
        collapsedClass  : The class applied to lists that have been collapsed (default 'dd-collapsed')
        placeClass      : The class of the placeholder element (default 'dd-placeholder')
        emptyClass      : The class used for empty list placeholder elements (default 'dd-empty')
        expandBtnHTML   : The HTML text used to generate a list item expand button (default '<button data-action="expand">Expand></button>')
        collapseBtnHTML : The HTML text used to generate a list item collapse button (default '<button data-action="collapse">Collapse</button>')

       */
      this.defaultOptions = function(value){
        defaultOptions = value;
      };
    })
    .directive('ngNestable', ['$compile', '$nestable', function($compile, $nestable) {
      return {
        restrict: 'A',
        require: 'ngModel',
        scope: true,
        compile: function(element) {
          var itemTemplate = element.html();
          element.empty();
          return function($scope, $element, $attrs, $ngModel) {

            // feel pretty bad about not using isolate scope here
            // but there was no other option
            // especially itemChanged expression is bad here

            $scope.list = $scope.$eval($attrs.list);
            $scope.itemChanged =  $scope.$eval($attrs.itemChanged);

            var options = $.extend(
              {},
              $nestable.defaultOptions,
              $scope.$eval($attrs.ngNestable)
            );
            // Added code
            var collectionChangesCounter = 0;
            //

            $scope.$watchCollection(function(){
              return $ngModel.$modelValue;
            }, function(model, oldModel) {
              if (model) {

                /**
                  Added code to handle change
                  callbacks and counter not to make request when collection loads
                */

                collectionChangesCounter > 0 && $scope.itemChanged && $scope.list && $scope.itemChanged($scope.list, model);
                collectionChangesCounter += 1;
                /**
                 * we are running the formatters here instead of watching on $viewValue because our model is an Array
                 * and angularjs ngModel watcher watches for "shallow" changes and otherwise the possible formatters wouldn't
                 * get executed
                 */
                model = runFormatters(model, $ngModel);
                // TODO: optimize as rebuilding is not necessary here
                var root = buildNestableHtml(model, itemTemplate);
                $element.empty().append(root);
                $compile(root)($scope);
                root.nestable(options);
                root.on('change', function(){
                  $ngModel.$setViewValue(root.nestable('serialize'));
                  // $scope && $scope.$root && $scope.$root.$$phase ||
                  $scope.$apply();
                });
              }
            });
          };
        },
        controller: angular.noop
      };

      function buildNestableHtml(model, tpl){
        var root = $('<div class="dd"></div>');
        if (model.length > 0)  {
          var rootList = $('<ol class="dd-list"></ol>').appendTo(root);
        } else {
          var rootList = $('<ol class="dd-empty"></ol>').appendTo(root);
        };

        model.forEach(function f(item){
          var list = Array.prototype.slice.call(arguments).slice(-1)[0];
          if(!(list instanceof $)) list = rootList;
          var listItem = $('<li class="dd-item"></li>');
          var listElement = $('<div class="dd-handle dd3-handle"></div>');
          var nestableItem = $('<div class="ng-nestable-item dd3-content" ng-nestable-item></div>');
          listElement.appendTo(listItem);
          nestableItem.append(tpl).appendTo(listItem);
          list.append(listItem);
          listItem.data('item', item.item);
          listItem.data('aggregate', item);
          if(isArray(item.children) && item.children.length > 0){
            var subRoot = $('<ol class="dd-list"></ol>').appendTo(listItem);
            item.children.forEach(function(item){
              f.apply(this, Array.prototype.slice.call(arguments).concat([subRoot]));
            });
          }
        });

        return root;
      }

      function isArray(arr){
        return Object.prototype.toString.call(arr) === '[object Array]';
      }

      function runFormatters(value, ctrl){
        var formatters = ctrl.$formatters,
        idx = formatters.length;

        ctrl.$modelValue = value;
        while(idx--) {
          value = formatters[idx](value);
        }

        return value;
      }
  }])
  .directive('ngNestableItem', ['$nestable', function($nestable){
    return {
      scope: true,
      require: '^ngNestable',
      link: function($scope, $element, $attrs) {
        $scope[$nestable.modelName] = $element.parent().data('item');
        $scope["$aggregate"] = $element.parent().data('aggregate');
      }
    };
  }]);
})(window, document, window.angular);