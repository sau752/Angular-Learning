(function () {
  var app = angular.module('gemStore', ['store-directives', 'ngRoute']);

  app.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "login.html"
      }).when("/product-home", {
        templateUrl: "product-home.html"
      }).otherwise({
        redirectTo: '/'
      });
  });

  app.controller('LoginFormController', ['$scope', '$location', function ($scope, $location) {
    $scope.username = "";
    $scope.password = "";
    $scope.submit = function () {
      if($scope.username === 'admin' && $scope.password === 'password') {
        $location.path('product-home');
      }
    };

  }]);

  app.controller('StoreController', ['$http', function ($http) {
    var store = this;
    store.products = [];
    $http.get('./store-products.json').success(function (data) {
      store.products = data;
    });
  }]);

  app.controller('ReviewController', function () {
    this.review = {};

    this.addReview = function (product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });
})();