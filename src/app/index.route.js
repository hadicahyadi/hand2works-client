(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('base',{
      url: "/"
    })

    .state('login',{
      url: "/login",
      templateUrl: "app/login/login.html",
    })

    .state('main',{
      abstract: true,
      templateUrl: "app/main/main.html",
      controller: "MainController"
    })

    /** DASHBOARD STATE */
     .state('main.dashboard',{
      url: "/dashboard",
      templateUrl: "app/dashboard/dashboard.html",
      controller: "DashboardController",
      controllerAs: "vm",
      parent: "main"
    })

    /** BRAND STATE */
     .state('main.brand',{
      url: "/brand",
      templateUrl: "app/brand/brand.html",
      controller: "BrandController",
      controllerAs: "vm",
      parent: "main"
    })
     .state('main.brand.dialog',{
      url: "/dialog",
      templateUrl: "app/brand/brand-dialog.html",
      onEnter: ["$state", function($state) {
        $(document).on("click", ".close", function() {
          $state.go("main.brand");
        });
      }]
    })

     /** CATEGORY STATE */
     .state('main.category',{
      url: "/category",
      templateUrl: "app/category/category.html",
      controller: "CategoryController",
      controllerAs: "vm",
      parent: "main"
    })
     .state('main.category.dialog',{
      url: "/dialog",
      templateUrl: "app/category/category-dialog.html",
      onEnter: ["$state", function($state) {
        $(document).on("click", ".close", function() {
          $state.go("main.category");
        });
      }]
    })

     /** CASHIER STATE */
     .state('main.cashier',{
      url: "/cashier",
      templateUrl: "app/cashier/cashier.html",
      controller: "CashierController",
      controllerAs: "vm",
      parent: "main"
    })

     /** PRODUCT STATE */
     .state('main.product',{
      url: "/product",
      templateUrl: "app/product/product.html",
      controller: "ProductController",
      controllerAs: "vm",
      parent: "main",
      resolve: {
        productData: function($http){
          var data = function($http){
            $http.get("http://localhost:8080/bos/api/product?itemsPerPage="+8+"&pageNumber="+1).success(function(response){
              return response.data;
            });
          }
          return data; 
        }
      }
    })
     .state('main.product.dialog',{
      url: "/dialog",
      templateUrl: "app/product/product-dialog.html",
      onEnter: ["$state", function($state) {
        $(document).on("click", ".close", function() {
          
          $state.go("main.product");
        });
      }]
    });

    $urlRouterProvider.otherwise('/brand');
  }

})();
