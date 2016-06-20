"use strict";

app.controller("UserRecipesCtrl", function ($scope, $location, recipeStorage) {
    $scope.userRecipes = [];

    recipeStorage.getUserRecipes().then(function(returnCollection){
        $scope.userRecipes = returnCollection;
    });
});
