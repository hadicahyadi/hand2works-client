(function() {
  'use strict';

  angular
    .module('hand2worksBos')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope,$log) {

    $rootScope.$on('$viewContentLoaded', function(event, next) {
      componentHandler.upgradeAllRegistered();
    });

    var mdlUpgradeDom = false;
    setInterval(function() {
      if (mdlUpgradeDom) {
        componentHandler.upgradeDom();
        mdlUpgradeDom = false;
      }
    }, 50);

    var observer = new MutationObserver(function () {
      mdlUpgradeDom = true;
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      $log.info(current);
      if(next.includes('dialog')){
        $("#backdrop").css("display","block");
        $("#pageContent").removeClass("ng-enter");
      }else{
        $("#backdrop").css("display","none");
      }
    });
  }

})();
