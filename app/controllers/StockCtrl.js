"use strict";

app.controller("StockCtrl", function ($scope, $location, recipeStorage) {
  $scope.stockRecipes = [];


    recipeStorage.getStockRecipes().then(function(returnCollection){
        $scope.stockRecipes = returnCollection;

    });

    $scope.postRecipeToUser = (thingy) => {

        recipeStorage.postRecipeToUser(thingy).then(() => {
            Materialize.toast(`"${thingy.name}" has been added to your recipes!`, 4000, 'light-green darken-4');
        });
    };
});
