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
            if (returnCollection[key].uid === undefined){
              stockRecipes.push(returnCollection[key]);
            };
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
          ingredient_1: itemToAdd.ingredient_1,
          ingredient_2: itemToAdd.ingredient_2,
          ingredient_3: itemToAdd.ingredient_3,
          ingredient_4: itemToAdd.ingredient_4,
          ingredient_5: itemToAdd.ingredient_5,
          ingredient_6: itemToAdd.ingredient_6,
          ingredient_7: itemToAdd.ingredient_7,
          ingredient_8: itemToAdd.ingredient_8,
          step_1: itemToAdd.step_1,
          step_2: itemToAdd.step_2,
          step_3: itemToAdd.step_3,
          notes: itemToAdd.notes,
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
            ingredient_1: newRecipe.ingredient_1,
            ingredient_2: newRecipe.ingredient_2,
            ingredient_3: newRecipe.ingredient_3,
            ingredient_4: newRecipe.ingredient_4,
            ingredient_5: newRecipe.ingredient_5,
            ingredient_6: newRecipe.ingredient_6,
            ingredient_7: newRecipe.ingredient_7,
            ingredient_8: newRecipe.ingredient_8,
            step_1: newRecipe.step_1,
            step_2: newRecipe.step_2,
            step_3: newRecipe.step_3,
            notes: newRecipe.notes,
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
      console.log("selectedRecipe", selectedRecipe);

      $http

        .get(`${firebaseURL}recipes/${selectedRecipe}.json`)
        .success(function(returnObject){
          console.log("selectedRecipe", selectedRecipe);


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
            ingredient_1: newRecipe.ingredient_1,
            ingredient_2: newRecipe.ingredient_2,
            ingredient_3: newRecipe.ingredient_3,
            ingredient_4: newRecipe.ingredient_4,
            ingredient_5: newRecipe.ingredient_5,
            ingredient_6: newRecipe.ingredient_6,
            ingredient_7: newRecipe.ingredient_7,
            ingredient_8: newRecipe.ingredient_8,
            step_1: newRecipe.step_1,
            step_2: newRecipe.step_2,
            step_3: newRecipe.step_3,
            notes: newRecipe.notes,
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
