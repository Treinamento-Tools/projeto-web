require.config({
    paths: {
        "angular": "../assets/js/angular.min",
        "angular-route": "../assets/js/angular-route.min",
        "domReady": "../assets/js/domReady"
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-route": {
            deps: ["angular"]
        },
        "module": {
            deps: ["angular"]
        }
    }
});

require(["domReady!", "angular", "app"], function(doc, angular) {
    angular.bootstrap(document, ['aplicacao']);
});