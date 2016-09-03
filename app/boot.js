define(["angular",
    "domReady",
    "ngRoute"
], function(angular, domReady) {
    var requireModules = ["shared/app.shared", "components/app.components", "app.routes"];
    var angularModules = ["shared", "components", "routes", "ngRoute"];

    require(requireModules, function() {

        angular.module("aplicacao", angularModules);


        angular.module("aplicacao").run(function($rootScope, $templateCache) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if (typeof(current) !== 'undefined') {
                    $templateCache.remove(current.templateUrl);
                }
            });
        });
        setTimeout(function() {
            angular.element(document).ready(function() {
                angular.bootstrap(document, ["aplicacao"]);
            });
        }, 1000);
    });

});