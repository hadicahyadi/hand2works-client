/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('BASE_URL', 'http://localhost:8080/bos/api')
    .constant('PAGE_SIZE',8);

})();
