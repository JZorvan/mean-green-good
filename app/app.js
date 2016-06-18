"use strict";

var app = angular.module("MeanGreenApp", ["ngRoute"])
  .constant("firebaseURL", "https://meangreengood.firebaseio.com/");


let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
  if (AuthFactory.isAuthenticated()) {
    console.log("isAuth");

    resolve();
  } else {
    reject();
  }
});

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "partials/logscreen.html",
      controller: "LogCtrl",
      resolve: {isAuth}
    })
    .when("/login", {
      templateUrl: "partials/logscreen.html",
      controller:  "LogCtrl"
    })
    .when("/register", {
      templateUrl: "partials/logscreen.html",
      controller:  "LogCtrl"
    })
    .when("/logout",{
      templateUrl: "partials/logscreen.html",
      controller:  "LogCtrl"
    })
});
