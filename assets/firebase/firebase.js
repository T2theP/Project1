// Initialize Firebase
var config = {
  apiKey: "AIzaSyBRwyFK5W9f000BjtqWu6T-WNuyDRbEekw",
  authDomain: "train-scheduler-e9691.firebaseapp.com",
  databaseURL: "https://train-scheduler-e9691.firebaseio.com",
  projectId: "train-scheduler-e9691",
  storageBucket: "train-scheduler-e9691.appspot.com",
  messagingSenderId: "959469509053"
};

firebase.initializeApp(config);

// Added Google login !!!!!!!

function login() {
  function newLoginHappened() {
    if (user) {
      app(user);
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().sighnInWithRedirect(provider);
    }
  }

  firebase.auth().onAuthStateChanged(newLoginHappened);
  }

function app(user) {
  // user.displayName
  // user.email
  // user.photoURL
  // user.uid
  document.getElementById("guest").innerHTML = user.displayName;
}

window.onload = login;


 // <body>
    // <h1>Hello <span id="guest"></span></h1>
  // </body/

// End of added google login !!!!!!!!

var wishList = [];

function retrieveWishlist() {

  database.ref(userKey).once('value').then(function (snapshot) {
    console.log(snapshot.val());

    if (snapshot.hasChild("list")) {

      userKey = snapshot.val().list;
      console.log("retrieve list:  " + userKey);
      wishList = snapshot.val().list;

    } else {
      userKey = userID

      console.log(userKey);

    };

  });
};

function writeWishlist() {

  var dataFormat = {
    parent: parentKey,
    list: wishList
  };

  database.ref().child(userKey).set(dataFormat);

};

// function readParent() {

//   database.ref(parentKey).once('value').then(function (snapshot) {
//     console.log(snapshot.val());

//     userKey = snapshot.val().child;

//   });
// };

function createNewChild() {

  var dataFormat = {
    parent: parentKey
  }

  database.ref().child(userKey).set(dataFormat);

};

function parentOrchild() {
  database.ref(userID).once('value').then(function (snapshot) {
    console.log(snapshot.val());

    if (snapshot.hasChild("child")) {
      userKey = snapshot.val().child;
    } else {
      userKey = userID
    };

    retrieveData()
  });

};
