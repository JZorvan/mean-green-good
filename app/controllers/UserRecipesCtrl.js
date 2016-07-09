"use strict";

app.controller("UserRecipesCtrl", function ($scope, recipeStorage, $routeParams) {
    $scope.userRecipes = [];

    recipeStorage.getUserRecipes().then(function(returnCollection){
        $scope.userRecipes = returnCollection;

        $scope.selectedRecipe = $scope.userRecipes.filter(function(recipe){
            return recipe.id === $routeParams.recipeId;
        })[0];
    });

    $scope.deleteRecipe = function(itemToDelete){
      recipeStorage.deleteRecipe(itemToDelete).then(function(response){
        Materialize.toast(`"${itemToDelete.name}" removed from your recipes!`, 1000, 'light-green darken-4');
        recipeStorage.getUserRecipes().then(function(returnCollection){
          $scope.userRecipes = returnCollection;
        });
      });
    };

});
