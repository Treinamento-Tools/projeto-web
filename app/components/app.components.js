define(['angular'], function(angular) {
    angular.module("components", ["ngRoute"]);

    require(["components/home/home-controller"]);
    require(["components/formulario/formulario"]);
});