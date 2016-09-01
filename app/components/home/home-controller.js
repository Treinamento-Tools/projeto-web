define(["../../app.module"], function(app) {
    
    app.controller("HomeController", HomeController);
    HomeController.$inject = ["$http"];

    function HomeController($http) {
        var vm = this;

        $http.get("http://tools-typeform-api.herokuapp.com/").then(function(res){
        	vm.typeForm = res.data;
        });


    }

});