angular.module("foot-stapp.controllers", [])

.controller("LoginCtrl", function($scope, shared, $location, $cordovaGeolocation, $ionicPlatform, $timeout) {
  $scope.data = {};


// $ionicPlatform.ready(function() {
//   $cordovaGeolocation
//     .getCurrentPosition({
//       timeout: 10000,
//       enableHighAccuracy: false
//     })
//     .then(function (position) {
//       var lat  = position.coords.latitude;
//       var long = position.coords.longitude;

// console.log({la: lat, lo: long});
//   }, function(err) {
//     // error
//   });
// });

  $scope.login = function() {
    shared.firebase.ref.authWithPassword({
      email: $scope.data.email,
      password: $scope.data.password
    }, function(error, authData) {
      if (error) {
        // TODO Show error
        console.log(error);
      } else {
        $timeout(function() {
          console.log(authData);
          shared.firebase.uid = shared.firebase.ref.getAuth().uid;
          $location.path("/tab/home");
        }, 50, true, authData);
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

.controller("SignUpCtrl", function($scope, shared, $ionicPopup, $location, $ionicHistory) {
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
    shared.firebase.ref.createUser({
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
  // $scope.homecards = HomeCards.all();
  myDataRef.on("value", function(snapshot) {
    var db = snapshot.val();
    $scope.homecards = createHCOs(db,"Isyankar_45");
console.log($scope.homecards);
  });
})

.controller("EventsCtrl", function($scope, $stateParams, eventsService, shared) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on("$ionicView.enter", function(e) {
  //});

var myDataRef = new Firebase('https://footstapp.firebaseio.com/');
  // myDataRef.on("value", function(snapshot) {
  //   var db = snapshot.val();
  //   $scope.homecards = createHCOs(db,"Isyankar_45");
  //   console.log($scope.homecards);
  // });


  $scope.events = eventsService.getEventsByUser(shared.uid);

  // $scope.remove = function(event) {
  //   eventsService.remove(event);
  // };
})

.controller("ChatDetailCtrl", function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller("AccountCtrl", function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
