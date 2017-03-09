(function() {
  'use strict';

  angular
  .module('hand2worksBos')
  .controller('ProductController',  ['$state','$log','BASE_URL','$scope','ProductService','BrandService','CategoryService',
    'Upload','toastr','PAGE_SIZE', ProductController]);

  
  /** @ngInject */
  function ProductController($state,$log,BASE_URL,$scope,ProductService,BrandService,CategoryService,Upload,toastr,PAGE_SIZE,productData) {

    $log.info(productData);
  	/** Controller Variables Goes Here*/
  	var vm = this;
  	$scope.$parent.pageTitle= "Product";
  	vm.backdrop = null;
    vm.autoCode = true;
  	vm.product = {
  		id: null,
  		brandId: null,
  		categoryId: null,
  		productCode: null,
  		productName: null,
  		price: 0,
  		minStock: 0,
  		totalStock: null,
  		imageName: null,
  		description: null,
      autoCode: null
  	};
  	vm.products = [];
    vm.brands = [];
    vm.categories = [];
    vm.currentPage = 1;
    vm.dataCount = 0;
    vm.imageFile = null;

    /** Initial Function Call **/
    load();
    loadBrand();
    loadCategory();

    /** Controller Function Goes Here */
    function loadBrand(){
      BrandService.getAll(99,1).success(function(response){
        $log.info(response);
        vm.brands = [].concat(response.datas);
      });
    }

    function loadCategory(){
      CategoryService.getAll(99,1).success(function(response){
        $log.info(response);
        vm.categories = [].concat(response.datas);
      });
    }

    function load(){
     //  ProductService.getAll(PAGE_SIZE,vm.currentPage).success(function(response){
     //   $log.info(response);
     //   vm.products = [].concat(response.datas);
     //   vm.dataCount = response.pageCount;
     // });
      $log.info(productData);
      // proudctData.success(function(response){
      //  $log.info(response);
      //  vm.products = [].concat(response.datas);
      //  vm.dataCount = response.pageCount;
      // });
    }

    vm.pageChangeHandler = function(pageNumber){
      vm.currentPage = pageNumber;
      load();
    }

    vm.isEdit = function(){
      if(vm.product == null){
       return "mdl-textfield mdl-js-textfield mdl-textfield--floating-label";
     }else{
       return "mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-focused";
     }
   }

   vm.uploadFiles = function(file, errFiles) {
      vm.imageFile = file;
      vm.product.imageName = file.name;
      $log.info(vm.imageFile.name);
      $scope.errFile = errFiles && errFiles[0];
    }

   vm.save = function(){
    vm.product.autoCode = vm.autoCode;
    ProductService.save(vm.imageFile,vm.product).then(function successCallback(response){
      $log.info(response);
      $state.go('main.product');
      vm.product = null;
      vm.imageFile = null;
      vm.currentPage = 1;
      toastr.success(response.data.message,'');
      load();
    },
    function errorCallback(response){
      $log.info(response);
    });
  }

  vm.edit = function(product){
    vm.product = product;
  }

}

})();
