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
      controller: "LogCtrl"
    })
    .when("/login", {
      templateUrl: "partials/logscreen.html",
      controller:  "LogCtrl"
    })
    .when("/register", {
      templateUrl: "partials/logscreen.html",
      controller:  "LogCtrl"
    })
    .when("/ourrecipes", {
      templateUrl: "partials/stock-recipes.html",
      controller: "StockCtrl",
      resolve: {isAuth}
    })
    .when("/myrecipes", {
      templateUrl: "partials/user-recipes.html",
      controller: "UserRecipesCtrl",
      resolve: {isAuth}
    })
    .when("/add", {
      templateUrl: "partials/recipe-form.html",
      controller: "NewRecipeCtrl",
      resolve: {isAuth}
    })
    .when("/myrecipes/:recipeId/edit", {
      templateUrl: "partials/recipe-form.html",
      controller: "EditRecipeCtrl",
      resolve: {isAuth}
    })
    .when("/logout",{
      templateUrl: "partials/logscreen.html",
      controller:  "LogCtrl"
    })
});
