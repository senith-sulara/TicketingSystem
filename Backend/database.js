
  var config = {
    apiKey: "AIzaSyBiHe0nbDtHpNlssGp-q0AhuK8tAVmkxbY",
    authDomain: "ticketingsystem-7e7b5.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://ticketingsystem-7e7b5-default-rtdb.firebaseio.com",
  storageBucket: "ticketingsystem-7e7b5.appspot.com",};
    firebase.initializeApp(config);
    // Get a reference to the database service
    var getDatabase = firebase.database();
