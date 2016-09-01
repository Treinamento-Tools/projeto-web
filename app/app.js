define(["angular",
    "domReady",
    "ngRoute"
], function(angular, domReady) {
    var requireModules = ["components/app.components"];
    var angularModules = ["components"];

    require(requireModules, function() {
        angular.module("aplicacao", angularModules);

        setTimeout(function() {
            angular.element(document).ready(function() {
                angular.bootstrap(document, ['aplicacao']);
            });
        }, 1000);
    });

});