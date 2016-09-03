require.config({
    urlArgs: "generated=" + (new Date()).getTime(),
    paths: {
        "angular": "../assets/js/angular.min",
        "ngRoute": "../assets/js/angular-route",
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

require(["boot"]);