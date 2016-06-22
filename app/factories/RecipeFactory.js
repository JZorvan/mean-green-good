"use strict";

app.factory("recipeStorage", function ($q, $http, firebaseURL, AuthFactory) {

  // Get the stock recipe bank from Firebase

  let getStockRecipes = () => {
    let stockRecipes = [];

    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}recipes.json`)
        .success(function(returnObject){
          let returnCollection = returnObject;
          Object.keys(returnCollection).forEach(function(key){
            returnCollection[key].id=key;
            stockRecipes.push(returnCollection[key]);
          });
          resolve(stockRecipes);
        })
        .error(function(error){
          reject(error);
        });
    });
  };

  // Gets the user's recipe bank from Firebase

  let getUserRecipes = () => {
    let userRecipes = [];
    let user = AuthFactory.getUser();

    return $q(function(resolve, reject){
      $http.get(`${firebaseURL}recipes.json?orderBy="uid"&equalTo="${user.uid}"`)
        .success(function(returnObject){
          let returnCollection = returnObject;
          Object.keys(returnCollection).forEach(function(key){
            returnCollection[key].id=key;
            userRecipes.push(returnCollection[key]);
          });
          resolve(userRecipes);
        })
        .error(function(error){
          reject(error);
        });
    });
  };

  // Posts a stock recipe to the user's recipe bank in Firebase

  let postRecipeToUser = (itemToAdd) => {
    let user = AuthFactory.getUser();
    console.log("user", user);

    return $q(function(resolve, reject) {
      $http.post(`${firebaseURL}recipes.json`,
        JSON.stringify({
          name: itemToAdd.name,
          liquid: itemToAdd.liquid,
          greens: itemToAdd.greens,
          fresh: itemToAdd.fresh,
          frozen: itemToAdd.frozen,
          directions: itemToAdd.directions,
          uid: user.uid
        })
      )
      .success(
        function(objectFromFirebase) {
          resolve(objectFromFirebase);
        }
      );
    });
  };

  let deleteRecipe = (itemToDelete) => {
    return $q(function(resolve, reject){
      $http
        .delete(`${firebaseURL}recipes/${itemToDelete.id}.json`)
        .success(function(objectFromFirebase){
          resolve(objectFromFirebase);
        });
    });
  };

  let addNewRecipe = (newRecipe) => {
    let user = AuthFactory.getUser();
      return $q(function(resolve, reject) {
        $http
          .post(`${firebaseURL}recipes.json`,
          JSON.stringify({
            name: newRecipe.name,
            liquid: newRecipe.liquid,
            greens: newRecipe.greens,
            fresh: newRecipe.fresh,
            frozen: newRecipe.frozen,
            directions: newRecipe.directions,
            uid: user.uid
          })
      )
          .success(
            function(objectFromFirebase) {
              resolve(objectFromFirebase);
            }
          );
      });
  };

  let getSingleRecipe = (selectedRecipe) => {
    return $q(function(resolve, reject){
      $http
        .get(`${firebaseURL}recipes/${selectedRecipe.id}.json`)
        .success(function(returnObject){
          console.log("selectedRecipe", selectedRecipe);
          console.log("selectedRecipe.id", selectedRecipe.id);


          resolve(returnObject);
        })
        .error(function(error){
          reject(error);
        });
    });
  };

  let updateRecipe = (recipeId, newRecipe) => {
    let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .put(`${firebaseURL}recipes/${recipeId}.json`,
          JSON.stringify({
            name: newRecipe.name,
            liquid: newRecipe.liquid,
            greens: newRecipe.greens,
            fresh: newRecipe.fresh,
            frozen: newRecipe.frozen,
            directions: newRecipe.directions,
            uid: user.uid
          })
        )
        .success(function(objectFromFirebase){
          resolve(objectFromFirebase);
        });
    });
  };

  return {getStockRecipes:getStockRecipes, getUserRecipes:getUserRecipes, postRecipeToUser:postRecipeToUser, deleteRecipe:deleteRecipe, addNewRecipe:addNewRecipe, getSingleRecipe:getSingleRecipe, updateRecipe:updateRecipe};

});
