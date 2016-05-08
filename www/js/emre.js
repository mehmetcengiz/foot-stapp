var myDataRef = new Firebase('https://footstapp.firebaseio.com/');
var db;
myDataRef.on('value', function (snapshot) {
    db = snapshot.val();
    //createHCOs(db, "Isyankar_45");
    //getFriendList(db, username);
});

function getProfile(username){
    var userid = getUserId(db,username);
    var person = db.Users[userid];
    console.log(person);
    return person;
}

function getFriendList(db, username) {
    var friendids = eval("db.Users[" + getUserId(db, username) + "].Friends");
    var userlist = db.Users;
    var friendlist = [];

    for (var i = 0; i < friendids.length; i++) {
        var friend = userlist[friendids[i]];
        console.log(friend);
        friendlist.push(friend);
    }
    console.log(friendlist);
    return friendlist;
}

function getUserId(db, username) {
    var userlist = db.Users;
    var userid = 0;
    for (var i = 0; i < userlist.length ; i++) {
        if (userlist[i].Username === username) {
            userid = i;
        }
    }
    return userid;
}
function createHCOs(db, username) {     //creates feed page of a User:Username
    // var userlist = db.Users;
    var userid = getUserId(db, username);

    var friendlist = eval("db.Users[" + userid + "].Friends");
    var HCOs = [];

    var count = 0;
    for (var i = 0; i < friendlist.length; i++) {
        var friendid = friendlist[i];
        var string = "db.Users[" + friendid + "].Events";
        var UO = eval("db.Users[" + friendid + "]");
        var FriendEventList = eval(string);
        for (var j = 0; j < FriendEventList.length; j++) {
            var UEO = FriendEventList[j];
            if (UEO.isDone === "false") {
                continue;
            }
            var EO = eval("db.Event[" + UEO.url + "]");
            //console.log("EO");
            var HCO = {user: UO, userevent: UEO, event: EO};
            //printHCO(HCO);
            HCOs[count] = HCO;
            count++;
        }
    }
    return HCOs;
}
function getEvents(db,username) {    //Prints the users own events.
  var userid =getUserId(db,username);
    var events =eval("db.Users["+ userid +"].Events");
    for (var i = 0, max = events.length; i < max; i++) {
        var data = db.Event[events[i].url];
        events[i] = {userevent: events[i], evendata: data};
    }
    return events;
}
function printHCOs(HCOs) {       //Prints all the Home Card Objects
    for (var i = 0; i < HCOs.length; i++) {
        printHCO(HCOs[i]);
    }
}
function printHCO(HCO) {        //Prints one Home Card Object
    printUser(HCO.user);
    printUserEvent(HCO.userevent);
    printEvent(HCO.event);
    document.write("<br/>");
}
function printUserEvent(userevent) {     //Prints the UserEvent Object
    var output = userevent.EventPhoto + " " + userevent.doneDate + " <br/>*" + userevent.Comment + "*";
    document.write(output + "</br>");
}
function printUser(user) {              //Prints the User Information
    var output = user.Username + " " + user.Name + " ";
    document.write(output + "</br>");
}
function printUsers(userlist) {         //Prints User Informations of a UserList
    for (var i = 0; i < userlist.length; i++) {
        printUser(userlist[i]);
    }
}
function printEvent(event) {            //Prints Information of an Event
    var output = event.EventName + "," + event.Details + ",  " + event.EventDate;
    var Categories = " ";
    for (var i = 0; i < event.Categories.length; i++) {
        Categories += "#" + event.Categories[i] + " ";
    }
    output += "<br/>Wish:" + event.WishCount + "<br/>Done:" + event.DoneCount;
    document.write(output + " <br/>" + Categories + "<br/>");
}
function printEvents(eventlist) {       //Prints Events' Information of an EventList
    for (var i = 0; i < eventlist.length; i++) {
        printEvent(eventlist[i]);
    }
}
