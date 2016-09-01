define(["angular", "app"], function(angular) {
	
    angular.module("aplicacao").config(ConfiguracaoAplicacao);
    ConfiguracaoAplicacao.$inject = ["$routeProvider"];

    function ConfiguracaoAplicacao($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "home"
        });
    }
});