angular.module("foot-stapp.services", [])

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

.factory("firebaseDataService", function(shared) {

  var root = new Firebase(shared.firebase.url);

  var service = {
    root: root,
    events: root.child('events'),
    users: root.child('users'),
    textMessages: root.child('textMessages')
  };

  return service;

})

.factory("eventsService", function($firebaseArray, firebaseDataService) {

  var events = null;

  var service = {
    Event: Event,
    getEventsByUser: getEventsByUser,
    reset: reset
  };

  return service;

  function Event() {
    this.addedDate = "";
    this.categories = null;
    this.details = "";
    this.doneCount = "";
    this.name = "";
    this.wishCount = "";
  }

  function getEventsByUser(uid) {
    if (!events) {
      events = $firebaseArray(firebaseDataService.users.child(uid).child("Events"));
    }

    return events;
  }

  function reset() {
    if (events) {
      events.$destroy();
      events = null;
    }
  }

});
