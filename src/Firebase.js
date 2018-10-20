import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCg5IpgWulYWXZkBNOCAUOBSWK4uIzx7TY",
  authDomain: "message-board-f0e57.firebaseapp.com",
  databaseURL: "https://message-board-f0e57.firebaseio.com",
  projectId: "message-board-f0e57",
  storageBucket: "message-board-f0e57.appspot.com",
  messagingSenderId: "89998565722"
};
firebase.initializeApp(config);

export const database = firebase.database().ref("posts/");
export const auth = firebase.auth();
export const google_provider = new firebase.auth.GoogleAuthProvider();
export const facebook_provider = new firebase.auth.FacebookAuthProvider();
export const twitter_provider = new firebase.auth.TwitterAuthProvider();
export const github_provider = new firebase.auth.GithubAuthProvider();
