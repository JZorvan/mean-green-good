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



  return {getStockRecipes:getStockRecipes, getUserRecipes:getUserRecipes, postRecipeToUser:postRecipeToUser};

});
