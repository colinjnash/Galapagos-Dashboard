import firebase from 'firebase';


  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyC5Z-AsLjvNuZGLAD-rlevGBpWTfkjs-9c',
    authDomain: 'turtles3-dashboard.firebaseapp.com',
    databaseURL: 'https://turtles3-dashboard.firebaseio.com',
    projectId: 'turtles3-dashboard',
    storageBucket: 'turtles3-dashboard.appspot.com',
    messagingSenderId: '145357060562'
  };
  var fire = firebase.initializeApp(config);
export default fire;