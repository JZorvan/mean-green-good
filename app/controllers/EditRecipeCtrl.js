"use strict";

app.controller("EditRecipeCtrl", function($scope, $location, $routeParams, recipeStorage){
    $scope.title = "Edit Recipe";
    $scope.submitButtonText = "Update";
    $scope.newRecipe = {};

    recipeStorage.getSingleRecipe($routeParams.recipeId)

        .then(function successCallback(response){
            $scope.newRecipe=response;
        })
        console.log("calling single recipe");

    $scope.addNewRecipe = function(){
        recipeStorage.updateRecipe($routeParams.recipeId, $scope.newRecipe)
            .then(function successCallback(response) {
                console.log(response);
                $location.url("/myrecipes");
            });
    };
});
