define(["angular"], function() {

    angular.module("routes", []);

    angular.module("routes").config(Configuracao);
    Configuracao.$inject = ["$routeProvider", "$httpProvider"];

    function Configuracao($routeProvider, $httpProvider) {
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $routeProvider
            .when("/home", {
                templateUrl: "app/components/home/home.html"
            })
            .when("/formulario", {
                templateUrl: "app/components/formulario/formulario.html"
            })
            .when("/finalizacao", {
                templateUrl: "app/components/finalizacao/finalizacao.html"
            });

        $routeProvider.otherwise({
            templateUrl: "app/components/home/home.html"
        });

    }
});