require.config({
    paths: {
        "angular": "../assets/js/angular.min",
        "ngRoute": "../assets/js/angular-route.min",
        "domReady": "../assets/js/domReady"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "ngRoute": {
            deps: ["angular"]
        },
        "module": {
            deps: ["angular"]
        }
    }
});

require(["app"]);