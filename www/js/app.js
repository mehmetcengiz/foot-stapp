// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'foot-stapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'foot-stapp.services' is found in services.js
// 'foot-stapp.controllers' is found in controllers.js
angular.module("foot-stapp", [
  "ionic",
  "foot-stapp.controllers",
  "foot-stapp.services",
  "ngCordova",
  "firebase"
])

.constant(
  "shared",
  {
    firebase: {
      url: "https://footstapp.firebaseio.com",
      ref: null, // this will be new Firebase object
    },
    uid: "844d477f-5e4c-4b1c-885e-e8a89c56cb5f"
    // uid: null // WARN this must be reset after logout
  }
)

.constant(
  "db",
  null
)

.run(function($ionicPlatform, shared, db) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    shared.firebase.ref = new Firebase(shared.firebase.url);

  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('sign-up', {
    url: '/sign-up',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignUpCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.events', {
    url: '/events',
    views: {
      'tab-events': {
        templateUrl: 'templates/tab-events.html',
        controller: 'EventsCtrl'
      }
    }
  })

  .state('tab.event-detail', {
    url: '/events/:eventId',
    views: {
      'tab-events': {
        templateUrl: 'templates/event-detail.html',
        controller: 'EventDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/home');
  // $urlRouterProvider.otherwise('/sign-up');
  $urlRouterProvider.otherwise('/login');

});
