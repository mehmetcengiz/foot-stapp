angular.module("foot-stapp.services", [])

.service("LoginService", function($q) {

  return {

    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (name == "user" && pw == "secret") {
        deferred.resolve("Welcome " + name + "!");
      } else {
        deferred.reject("Wrong credentials.");
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }

  }

})

.factory("HomeCards", function() {

  var homecards = [
    {
      id: 0,
      avatar: "img/max.png",
      name: "Ozan Müyesseroğlu",
      eventName: "test event",
      eventDescription: "test Description",
      eventPhoto: "img/adam.jpg",
      eventMessage: "Test event Message"
    },
    {
      id: 1,
      avatar: "img/mike.png",
      name: "Mehmet Cengiz",
      eventName: "test event",
      eventDescription: "test Description",
      eventPhoto: "img/ben.png",
      eventMessage: "Test event Message"
    },
    {
      id: 2,
      avatar: "img/perry.png",
      name: "Emre Danışan",
      eventName: "test event",
      eventDescription: "test Description",
      eventPhoto: "img/ionic.png",
      eventMessage: "Test event Message"
    }
  ];

  return {

    all: function() {
      return homecards;
    },

    remove: function(card) {
      homecards.splice(homecards.indexOf(card), 1);
    },

    get: function(cardId) {
      for (var i = 0; i < homecards.length; i++) {
        if (homecards[i].id === parseInt(cardId)) {
          return homecards[i];
        }
      }

      return null;
    }

  };

})

.factory("Events", function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [
    {
      id: 0,
      name: "Ben Sparrow",
      lastText: "You on your way?",
      face: "img/ben.png"
    },
    {
      id: 1,
      name: "Max Lynx",
      lastText: "Hey, it\"s me",
      face: "img/max.png"
    },
    {
      id: 2,
      name: "Adam Bradleyson",
      lastText: "I should buy a boat",
      face: "img/adam.jpg"
    },
    {
      id: 3,
      name: "Perry Governor",
      lastText: "Look at my mukluks!",
      face: "img/perry.png"
    },
    {
      id: 4,
      name: "Mike Harrington",
      lastText: "This is wicked good ice cream.",
      face: "img/mike.png"
    }
  ];

  return {

    all: function() {
      return chats;
    },

    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },

    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }

      return null;
    }

  };

})

.factory("FireBase", function() {
  var firebase = null;

  return {

    ref: function() {
      if (firebase === null) {
        firebase = new Firebase("https://boiling-torch-9398.firebaseio.com");
      }

      return firebase;
    }

  };
});
