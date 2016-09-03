define(["angular"], function(angular) {
    angular.module("components").controller("HomeController", HomeController);
    HomeController.$inject = ["$http", "$typeFormService"];

    function HomeController($http, $typeFormService) {
        var vm = this;

        vm.typeForm = null;
        vm.carregarTypeForm = carregarTypeForm;

        function carregarTypeForm() {
            $http.get("http://tools-typeform-api.herokuapp.com/").then(function(res) {
                vm.typeForm = res.data;
                console.log("Questoes: ", $typeFormService.agruparQuestoes(res.data));
                console.log("Respostas: ", $typeFormService.agruparRespostas(res.data));
                console.log($typeFormService.agruparRespostas(res.data))
            }, function(cause) {
                console.log(cause)
            })
        }
    }

});