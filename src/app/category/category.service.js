(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .service('CategoryService',['$http','BASE_URL',function ($http,BASE_URL){

    	this.getAll = function (itemsPerPage,pageNumber){
    		 return $http.get(BASE_URL+"/category?itemsPerPage="+itemsPerPage+"&pageNumber="+pageNumber);
    	}

    	this.save = function(brand){
    		return  $http.put(BASE_URL+"/category",brand);
    	}

    	this.remove = function(id){
    		return $http.post(BASE_URL+"/category?id="+id);
    	}

    }]);

})();