"use strict";

app.controller("UserRecipesCtrl", function ($scope, recipeStorage) {
    $scope.userRecipes = [];

    recipeStorage.getUserRecipes().then(function(returnCollection){
        $scope.userRecipes = returnCollection;
    });

    $scope.deleteRecipe = function(itemToDelete){
      console.log("itemToDelete", itemToDelete);
      recipeStorage.deleteRecipe(itemToDelete).then(function(response){
        Materialize.toast(`"${itemToDelete.name}" removed from your recipes!`, 4000, 'teal');
        recipeStorage.getUserRecipes().then(function(returnCollection){
          $scope.userRecipes = returnCollection;
        });
      });
    };

});
