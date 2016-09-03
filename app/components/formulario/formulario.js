define(["angular"], function(angular) {
    angular.module("components").controller("FormularioController", FormularioController);
    FormularioController.$inject = ["$http", "$typeFormService"];

    function FormularioController($http, $typeFormService) {
        var vm = this;
        vm.questoes = $typeFormService.getQuestoes();
    }

});