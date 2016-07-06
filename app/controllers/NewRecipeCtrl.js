"use strict";

app.controller("NewRecipeCtrl", function($scope, $location, recipeStorage){
  $scope.title = "Add a New Recipe";
  $scope.submitButtonText = "Add Recipe";
  $scope.newRecipe = {
    name: "",
    liquid: "",
    greens: "",
    fresh: "",
    frozen: "",
    directions: "",
    notes: "",
    uid: ""
  };

  $scope.addNewRecipe = function(newRecipe){
    recipeStorage.addNewRecipe(newRecipe)
      .then(function successCallback(response) {
        Materialize.toast(`"${newRecipe.name}" added to your recipes!`, 4000, 'light-green darken-4');
        $location.url("/myrecipes");
      });
  };
});
