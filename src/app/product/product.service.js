(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .service('ProductService',['$http','BASE_URL',function ($http,BASE_URL){

    	this.getAll = function (itemsPerPage,pageNumber){
    		 return $http.get(BASE_URL+"/product?itemsPerPage="+itemsPerPage+"&pageNumber="+pageNumber);
    	}

    	this.save = function(imageFile,requestData){

    		return $http({
                url: BASE_URL+"/product",
                params: {data: requestData},
                transformRequest: function(){
                    var formData = new FormData();
                    formData.append('imageFile',imageFile);
                    return formData;
                },
                method: "POST",
                headers: {'Content-type': undefined}
            });
    	}

    	this.remove = function(id){
    		return $http.post(BASE_URL+"/product?id="+id);
    	}

    }]);

})();