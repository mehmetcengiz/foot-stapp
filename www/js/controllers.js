angular.module("foot-stapp.controllers", [])

.controller("LoginCtrl", function($scope, firebase, $location) {
  $scope.data = {};

  $scope.login = function() {
    firebase.authWithPassword({
      email: $scope.data.email,
      password: $scope.data.password
    }, function(error, authData) {
      if (error) {
        // TODO Show error
        console.log(error);
      } else {
        $location.path("/tab/home");
      }
    }, {
      remember: "sessionOnly"
    });
  }

  $scope.signUp = function() {
    // Go to sign up view
    $location.path("/sign-up");
  }
})

.controller("SignUpCtrl", function($scope, firebase, $ionicPopup, $location, $ionicHistory) {
  $scope.data = {};

  $scope.showSuccessPopup = function(callback) {
    var successPopup = $ionicPopup.alert({
      title: "Successfully signed up",
      template: "You have successfully signed up. Please login with your e-mail address and password."
    });

    successPopup.then(function(res) {
      if (typeof callback === "function") {
        callback.apply();
      }
    });
 };

  $scope.signUp = function() {
    firebase.createUser({
      email: $scope.data.email,
      password: $scope.data.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);

        $scope.showSuccessPopup(function () {
          $ionicHistory.nextViewOptions({
            historyRoot: true
          });
          $location.path("/login");
        });
      }
    });
  }
})

.controller("HomeCtrl", function($scope, $stateParams, HomeCards) {
  $scope.homecards = HomeCards.all();
})

.controller("EventsCtrl", function($scope, Events) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on("$ionicView.enter", function(e) {
  //});

  $scope.events = Events.all();

  $scope.remove = function(event) {
    Events.remove(event);
  };
})

.controller("ChatDetailCtrl", function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller("AccountCtrl", function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
