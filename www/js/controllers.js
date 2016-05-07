angular.module('footstapp.controllers', [])

.controller('HomeCtrl', function($scope, $stateParams, HomeCards) {
  $scope.homecards = HomeCards.all();
})

.controller('EventsCtrl', function($scope, Events) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.events = Events.all();

  $scope.remove = function(event) {
    Events.remove(event);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };


})

.controller('LoginCtrl', function($scope) {
    $scope.data = {};

    $scope.login = function() {
        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
    }
    $scope.signup = function(){
        console.log("ASDASDASDASDASD");
    }
});
