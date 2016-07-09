"use strict";

app.controller("NewRecipeCtrl", function($scope, $location, recipeStorage){
  $scope.title = "Add a New Recipe";
  $scope.submitButtonText = "Add Recipe";
  $scope.newRecipe = {
    name: "",
    ingredient_1: "",
    ingredient_2: "",
    ingredient_3: "",
    ingredient_4: "",
    ingredient_5: "",
    ingredient_6: "",
    ingredient_7: "",
    ingredient_8: "",
    step_1: "",
    step_2: "",
    step_3: "",
    notes: "",
    uid: ""
  };

  $scope.addNewRecipe = function(newRecipe){
    recipeStorage.addNewRecipe(newRecipe)
      .then(function successCallback(response) {
        Materialize.toast(`"${newRecipe.name}" added to your recipes!`, 3000, 'light-green darken-4');
        $location.url("/myrecipes");
      });
  };
});
