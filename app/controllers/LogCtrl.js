"use strict";

app.controller('LogCtrl', function ($scope, $location, $rootScope, firebaseURL, AuthFactory) {

  let ref = new Firebase(firebaseURL);

  if($location.path() === "/login"){
      $rootScope.modeLogin = true;
  };

  if($location.path() === "/register"){
      $rootScope.modeLogin = false;
  };

  if($location.path() === "/logout"){
    ref.unauth();
    $rootScope.isActive = false;
  };

  $rootScope.account = {
    email: "",
    password: ""
  };

  $scope.register = (AuthFactory) => {
    ref.createUser({
      email: $rootScope.account.email,
      password: $rootScope.account.password
    }, (error, userData) => {
      if (error) {
        $scope.errorMessage = error.message;
        $scope.userError = true;
        $scope.$apply();
      } else if (userData) {
        $scope.login();
      }
    });
  };

  $scope.login = () => {
    AuthFactory
      .authenticate($rootScope.account)
        .then((userCreds) => {
          $scope.$apply(function() {
            Materialize.toast(`Welcome to your smoothie headquarters!`, 4000, 'light-green darken-4');
            $location.path("/userHome");
            $rootScope.isActive = true;
          });
        })
        .catch((error) => {
          $scope.errorMessage = error.message;
          $scope.userError = true;
          $scope.$apply();
        });
  };

});
