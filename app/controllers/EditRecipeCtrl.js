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
                Materialize.toast(`"${newRecipe.name}" has been updated!`, 4000, 'light-green darken-4');
                $location.url("/myrecipes");
            });
    };
});
