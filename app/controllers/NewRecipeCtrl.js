"use strict";

app.controller("NewRecipeCtrl", function($scope, $location, recipeStorage){
  $scope.title = "New Recipe";
  $scope.submitButtonText = "Add Recipe";
  $scope.newRecipe = {
    name: "",
    liquid: "",
    greens: "",
    fresh: "",
    frozen: "",
    directions: "",
    uid: ""
  };

  $scope.addNewRecipe = function(newRecipe){
    recipeStorage.addNewRecipe(newRecipe)
      .then(function successCallback(response) {
        Materialize.toast(`"${newRecipe.name}" added to your recipes!`, 4000, 'teal');
        $location.url("/myrecipes");
      });
  };
});
